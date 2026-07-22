import React, { useContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
	View,
	Text,
	ScrollView,
	Animated,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { colorStyle } from '../../styles/Colors';
import { styles } from './HomeScreen.styles';
import SideLeftMenu from '../../components/SideLeftMenu';
import { User } from '../../contexts/UserContext';
import { getFoodsInDate } from '../../services/FoodService';
import {
	getStrengthExercisesInDate,
	getCardioExercisesInDate,
} from '../../services/exerciseService';
import { getCathegories } from '../../services/cathegoryService';
import SummaryCard from '../../components/SummaryCard';
import WeeklyCaloriesChart from '../../components/WeeklyCaloriesChart';
import StrengthCategoryChart from '../../components/StrengthCategoryChart';

dayjs.extend(isoWeek);

const menuWidth = 250;
const DAILY_KCAL_TARGET = 2000;

const HomeScreen = ({ navigation }) => {
	const { user, token, isGuest } = useContext(User);
	const [menuOpen, setMenuOpen] = useState(false);
	const slideAnim = useState(new Animated.Value(-menuWidth))[0];

	const [loading, setLoading] = useState(true);
	const [weekKcal, setWeekKcal] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [weekStrengthExercises, setWeekStrengthExercises] = useState([]);
	const [weekCardioCount, setWeekCardioCount] = useState(0);
	const [categories, setCategories] = useState([]);
	const [categoryData, setCategoryData] = useState([]);

	const toggleMenu = () => {
		Animated.timing(slideAnim, {
			toValue: menuOpen ? -menuWidth : 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		Animated.timing(slideAnim, {
			toValue: -menuWidth,
			duration: 300,
			useNativeDriver: false,
		}).start();
		setMenuOpen(false);
	};

	const getWeekDates = useCallback(() => {
		const today = dayjs();
		const monday = today.startOf('isoWeek');
		return Array.from({ length: 7 }, (_, i) => monday.add(i, 'day'));
	}, []);

	const processCategoryData = useCallback((strengthExercises) => {
		const grouped = {};
		strengthExercises.forEach((exercise) => {
			const cat = exercise.cathegoryName || 'Sin categoría';
			if (!grouped[cat]) {
				grouped[cat] = { categoryName: cat, totalReps: 0, totalSets: 0, exerciseCount: 0, exercises: [] };
			}
			const reps = (exercise.sets || []).reduce((sum, s) => sum + (s.repeats || 0), 0);
			const sets = (exercise.sets || []).length;
			grouped[cat].totalReps += reps;
			grouped[cat].totalSets += sets;
			grouped[cat].exerciseCount += 1;
			grouped[cat].exercises.push({ name: exercise.name, totalReps: reps });
		});
		return Object.values(grouped).sort((a, b) => b.totalReps - a.totalReps);
	}, []);

	const loadDashboardData = useCallback(async () => {
		try {
			setLoading(true);
			const weekDates = getWeekDates();

			const [catsResults, foodResults, strengthResults, cardioResults] = await Promise.all([
				getCathegories(token, isGuest).catch(() => []),
				Promise.all(
					weekDates.map((date) =>
						getFoodsInDate(date.format('YYYY-MM-DD'), user.uuidUser, token, isGuest).catch(() => [])
					)
				),
				Promise.all(
					weekDates.map((date) =>
						getStrengthExercisesInDate(date.format('YYYY-MM-DD'), user.uuidUser, token, isGuest).catch(() => [])
					)
				),
				Promise.all(
					weekDates.map((date) =>
						getCardioExercisesInDate(date.format('YYYY-MM-DD'), user.uuidUser, token, isGuest).catch(() => [])
					)
				),
			]);

			// Kcal per day
			const dailyKcal = foodResults.map((foods) =>
				foods.reduce((sum, food) => sum + (food.kcal || 0), 0)
			);

			// All strength exercises for the week
			const allStrength = strengthResults.flat();

			// Total cardio count
			const totalCardio = cardioResults.reduce((sum, day) => sum + day.length, 0);

			setWeekKcal(dailyKcal);
			setWeekStrengthExercises(allStrength);
			setWeekCardioCount(totalCardio);
			setCategories(catsResults);
			setCategoryData(processCategoryData(allStrength));
		} catch (error) {
			console.error('Error loading dashboard data:', error);
		} finally {
			setLoading(false);
		}
	}, [user, token, isGuest, getWeekDates, processCategoryData]);

	useFocusEffect(
		useCallback(() => {
			if (user) {
				loadDashboardData();
			}
		}, [user])
	);

	// Summary values
	const totalStrengthCount = weekStrengthExercises.length;
	const totalExercises = totalStrengthCount + weekCardioCount;
	const maxKcal = Math.max(...weekKcal, DAILY_KCAL_TARGET);
	const avgKcal = weekKcal.reduce((a, b) => a + b, 0) / 7;
	const onTrack = avgKcal > 0 && avgKcal <= DAILY_KCAL_TARGET * 1.1 && avgKcal >= DAILY_KCAL_TARGET * 0.5;

	return (
		<LinearGradient
			style={styles.mainContainer}
			colors={colorStyle.mainGradient}
		>
			{/* Menu button */}
			<TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
				<Text style={styles.menuIcon}>☰</Text>
			</TouchableOpacity>

			<SideLeftMenu slideAnim={slideAnim} menuOpen={menuOpen} closeMenu={closeMenu} />

			{isGuest && (
				<View style={styles.guestBanner}>
					<Text style={styles.guestBannerText}>Modo invitado — Los datos se guardan solo en este dispositivo</Text>
				</View>
			)}

			{/* Dashboard content */}
			<View style={styles.content}>
				<View style={styles.summaryContainer}>
					{loading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="large" color="#FFFFFF" />
							<Text style={styles.loadingText}>Cargando dashboard...</Text>
						</View>
					) : (
						<ScrollView
							showsVerticalScrollIndicator={false}
							contentContainerStyle={styles.scrollContent}
						>
							{/* Title */}
							<Text style={styles.title}>Mi Resumen</Text>

							{/* Summary cards */}
							<View style={styles.cardsRow}>
								<SummaryCard
									icon="💪"
									value={totalExercises}
									label="Ejercicios esta semana"
									accentColor={colorStyle.mainGradient[1]}
								/>
								<SummaryCard
									icon="🔥"
									value={Math.round(avgKcal)}
									label="Kcal promedio / día"
									accentColor={colorStyle.mainGradient[0]}
								/>
								<SummaryCard
									icon={onTrack ? '✅' : '⚠️'}
									value={onTrack ? 'Sí' : 'No'}
									label="En camino"
									accentColor={onTrack ? '#4CAF50' : '#FF9800'}
								/>
							</View>

							{/* Weekly kcal chart */}
							<WeeklyCaloriesChart
								dailyKcal={weekKcal}
								maxKcal={maxKcal}
							/>

							{/* Strength exercises by category */}
							<StrengthCategoryChart
								categoryData={categoryData}
								categories={categories}
							/>
						</ScrollView>
					)}
				</View>
			</View>
		</LinearGradient>
	);
};

export default HomeScreen;
