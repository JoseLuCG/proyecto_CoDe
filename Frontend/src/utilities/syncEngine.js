import { HOST_IP } from "./defineConfig";
import { getAll, removeById } from "./offlineQueue";

export async function syncPendingOperations() {
    const queue = await getAll();
    let synced = 0;

    for (const op of queue) {
        try {
            const url = HOST_IP + op.endpoint;
            const fetchOptions = {
                method: op.method,
                headers: op.headers
            };
            if (op.body) {
                fetchOptions.body = JSON.stringify(op.body);
            }

            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                await removeById(op.id);
                synced++;
            } else {
                break;
            }
        } catch {
            break;
        }
    }

    return { synced, remaining: queue.length - synced };
}
