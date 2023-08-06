const queueItem = [];
export async function blockingGet(key) {
    return new Promise((resolve) => {
        const startTime = Date.now();
    
        // Function to check the queue for data
        function checkQueue() {
          const index = queueItem.findIndex((item) => item.key === key);
    
          // If data found in the queue, resolve with the data
          if (index !== -1) {
            const jsonData = queueItem[index].data;
            queueItem.splice(index, 1);
            resolve(jsonData);
          } else {
            // If no data in the queue and 30 seconds have not passed, check again
            if (Date.now() - startTime < 30000) {
              setTimeout(checkQueue, 100);
            } else {
              // If 30 seconds have passed and still no data, resolve with null
              resolve(null);
            }
          }
        }
    
        checkQueue();
      });
}

export async function push(key, data) {
    queueItem.push({ key, data });
}
