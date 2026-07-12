import Storage from "./storagePersistence";

const QUEUE_KEY = "pendingOperations";

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export async function enqueue(operation) {
    const queue = await getAll();
    queue.push({
        id: generateId(),
        method: operation.method,
        endpoint: operation.endpoint,
        body: operation.body,
        headers: operation.headers,
        timestamp: Date.now()
    });
    await Storage.setItem(QUEUE_KEY, JSON.stringify(queue));
    return queue.length;
}

export async function getAll() {
    const raw = await Storage.getItem(QUEUE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export async function removeById(id) {
    const queue = await getAll();
    const filtered = queue.filter(op => op.id !== id);
    await Storage.setItem(QUEUE_KEY, JSON.stringify(filtered));
}

export async function clear() {
    await Storage.setItem(QUEUE_KEY, JSON.stringify([]));
}

export async function getCount() {
    const queue = await getAll();
    return queue.length;
}
