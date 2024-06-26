(function() {
    function randomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function updateEstimatedTime(friendsToRemoveCount) {
        const estimatedTotalTime = (friendsToRemoveCount * (6000 + 12000) / 2) / 1000; // average delay
        const minutes = Math.floor(estimatedTotalTime / 60);
        const seconds = Math.floor(estimatedTotalTime % 60);
        statusBarEstimatedTime.textContent = `Estimated time to remove non-whitelisted friends: ${minutes}m ${seconds}s`;
    }

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.backgroundColor = '#2c2f33';
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.zIndex = '1000';
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    container.style.color = 'white';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '1px';
    closeButton.style.right = '1px';
    closeButton.style.padding = '1px 2px';
    closeButton.style.borderRadius = '1px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#ff414d';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', function() {
        document.body.removeChild(container);
    });

    const tokenInput = document.createElement('input');
    tokenInput.type = 'text';
    tokenInput.placeholder = 'Enter your token';
    tokenInput.style.marginBottom = '10px';
    tokenInput.style.padding = '5px';
    tokenInput.style.borderRadius = '5px';
    tokenInput.style.border = 'none';
    tokenInput.style.width = '200px';

    const setTokenButton = document.createElement('button');
    setTokenButton.textContent = 'Set Token';
    setTokenButton.style.marginBottom = '10px';
    setTokenButton.style.padding = '10px';
    setTokenButton.style.borderRadius = '5px';
    setTokenButton.style.border = 'none';
    setTokenButton.style.backgroundColor = '#7289da';
    setTokenButton.style.color = 'white';
    setTokenButton.style.cursor = 'pointer';

    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Friends';
    downloadButton.style.marginBottom = '10px';
    downloadButton.style.padding = '10px';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.border = 'none';
    downloadButton.style.backgroundColor = '#7289da';
    downloadButton.style.color = 'white';
    downloadButton.style.cursor = 'pointer';

    const importWhitelistButton = document.createElement('button');
    importWhitelistButton.textContent = 'Import Whitelist';
    importWhitelistButton.style.marginBottom = '10px';
    importWhitelistButton.style.padding = '10px';
    importWhitelistButton.style.borderRadius = '5px';
    importWhitelistButton.style.border = 'none';
    importWhitelistButton.style.backgroundColor = '#7289da';
    importWhitelistButton.style.color = 'white';
    importWhitelistButton.style.cursor = 'pointer';

    const exportWhitelistButton = document.createElement('button');
    exportWhitelistButton.textContent = 'Export Whitelist';
    exportWhitelistButton.style.marginBottom = '10px';
    exportWhitelistButton.style.padding = '10px';
    exportWhitelistButton.style.borderRadius = '5px';
    exportWhitelistButton.style.border = 'none';
    exportWhitelistButton.style.backgroundColor = '#7289da';
    exportWhitelistButton.style.color = 'white';
    exportWhitelistButton.style.cursor = 'pointer';

    const whitelistFriendsButton = document.createElement('button');
    whitelistFriendsButton.textContent = 'Whitelist Friends';
    whitelistFriendsButton.style.marginBottom = '10px';
    whitelistFriendsButton.style.padding = '10px';
    whitelistFriendsButton.style.borderRadius = '5px';
    whitelistFriendsButton.style.border = 'none';
    whitelistFriendsButton.style.backgroundColor = '#7289da';
    whitelistFriendsButton.style.color = 'white';
    whitelistFriendsButton.style.cursor = 'pointer';

    const removeFriendsButton = document.createElement('button');
    removeFriendsButton.textContent = 'Remove Non-Whitelisted Friends';
    removeFriendsButton.style.marginBottom = '10px';
    removeFriendsButton.style.padding = '10px';
    removeFriendsButton.style.borderRadius = '5px';
    removeFriendsButton.style.border = 'none';
    removeFriendsButton.style.backgroundColor = '#7289da';
    removeFriendsButton.style.color = 'white';
    removeFriendsButton.style.cursor = 'pointer';

    const statusBar = document.createElement('div');
    statusBar.style.marginTop = '10px';
    statusBar.style.padding = '10px';
    statusBar.style.borderRadius = '5px';
    statusBar.style.backgroundColor = '#2c2f33';
    statusBar.style.color = 'white';
    statusBar.style.width = '100%';
    statusBar.style.textAlign = 'center';

    const statusBarEstimatedTime = document.createElement('div');
    statusBarEstimatedTime.style.marginTop = '10px';
    statusBarEstimatedTime.style.padding = '10px';
    statusBarEstimatedTime.style.borderRadius = '5px';
    statusBarEstimatedTime.style.backgroundColor = '#2c2f33';
    statusBarEstimatedTime.style.color = 'white';
    statusBarEstimatedTime.style.width = '100%';
    statusBarEstimatedTime.style.textAlign = 'center';

    container.appendChild(closeButton);
    container.appendChild(tokenInput);
    container.appendChild(setTokenButton);
    container.appendChild(downloadButton);
    container.appendChild(importWhitelistButton);
    container.appendChild(exportWhitelistButton);
    container.appendChild(whitelistFriendsButton);
    container.appendChild(removeFriendsButton);
    container.appendChild(statusBar);
    container.appendChild(statusBarEstimatedTime);
    document.body.appendChild(container);

    let authToken = '';
    let whitelist = [];
    let friendsList = [];

    setTokenButton.addEventListener('click', async () => {
        authToken = tokenInput.value;
        alert('Token set successfully!');

        if (!authToken) {
            alert('Please set your token first.');
            return;
        }

        try {
            const response = await fetch('/api/v9/users/@me/relationships', {
                headers: {
                    'Authorization': authToken
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch friends');
            }

            friendsList = await response.json();
            updateEstimatedTime(friendsList.filter(friend => !whitelist.includes(friend.id)).length);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch friends.');
        }
    });

    downloadButton.addEventListener('click', async () => {
        if (!authToken) {
            alert('Please set your token first.');
            return;
        }

        try {
            const response = await fetch('/api/v9/users/@me/relationships', {
                headers: {
                    'Authorization': authToken
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch friends');
            }

            const friends = await response.json();
            const friendsIds = friends.map(friend => friend.id);

            const blob = new Blob([friendsIds.join('\n')], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'friends_ids.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            alert('Friends IDs saved to friends_ids.txt');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to download friends.');
        }
    });

    importWhitelistButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';

        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const importedIds = e.target.result.split('\n').map(id => id.trim()).filter(id => id);
                whitelist = whitelist.concat(importedIds.filter(id => !whitelist.includes(id)));
                alert('Whitelist imported successfully!');
                updateEstimatedTime(friendsList.filter(friend => !whitelist.includes(friend.id)).length);
            };

            reader.readAsText(file);
        });

        input.click();
    });

    exportWhitelistButton.addEventListener('click', () => {
        const blob = new Blob([whitelist.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Whitelist.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        alert('Whitelist exported to Whitelist.txt');
    });

    whitelistFriendsButton.addEventListener('click', async () => {
        if (!authToken) {
            alert('Please set your token first.');
            return;
        }

        try {
            const response = await fetch('/api/v9/users/@me/relationships', {
                headers: {
                    'Authorization': authToken
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch friends');
            }

            friendsList = await response.json();
            friendsList.sort((a, b) => a.since - b.since);

            const whitelistContainer = document.createElement('div');
            whitelistContainer.style.position = 'fixed';
            whitelistContainer.style.top = '10px';
            whitelistContainer.style.right = '250px'; // Positioned closer to the main window
            whitelistContainer.style.backgroundColor = '#2c2f33';
            whitelistContainer.style.padding = '20px';
            whitelistContainer.style.borderRadius = '10px';
            whitelistContainer.style.zIndex = '1000';
            whitelistContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            whitelistContainer.style.color = 'white';
            whitelistContainer.style.fontFamily = 'Arial, sans-serif';
            whitelistContainer.style.maxHeight = '80%';
            whitelistContainer.style.overflowY = 'auto';

            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search friends';
            searchInput.style.marginBottom = '10px';
            searchInput.style.padding = '5px';
            searchInput.style.borderRadius = '5px';
            searchInput.style.border = 'none';
            searchInput.style.width = '100%';

            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const friendItems = whitelistContainer.querySelectorAll('.friend-item');
                friendItems.forEach(item => {
                    const friendName = item.querySelector('.friend-name').textContent.toLowerCase();
                    if (friendName.includes(query)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });

            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'Close';
            closeBtn.style.marginBottom = '10px';
            closeBtn.style.padding = '10px';
            closeBtn.style.borderRadius = '5px';
            closeBtn.style.border = 'none';
            closeBtn.style.backgroundColor = '#7289da';
            closeBtn.style.color = 'white';
            closeBtn.style.cursor = 'pointer';
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(whitelistContainer);
            });

            whitelistContainer.appendChild(searchInput);
            whitelistContainer.appendChild(closeBtn);

            friendsList.forEach(friend => {
                const friendItem = document.createElement('div');
                friendItem.className = 'friend-item';
                friendItem.style.display = 'flex';
                friendItem.style.alignItems = 'center';
                friendItem.style.marginBottom = '5px';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.style.marginRight = '10px';
                checkbox.checked = whitelist.includes(friend.id);

                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        if (!whitelist.includes(friend.id)) {
                            whitelist.push(friend.id);
                        }
                    } else {
                        const index = whitelist.indexOf(friend.id);
                        if (index > -1) {
                            whitelist.splice(index, 1);
                        }
                    }
                    updateEstimatedTime(friendsList.filter(friend => !whitelist.includes(friend.id)).length);
                });

                const friendName = document.createElement('span');
                friendName.className = 'friend-name';
                friendName.textContent = `${friend.user.username} / ${friend.user.global_name}`;

                friendItem.appendChild(checkbox);
                friendItem.appendChild(friendName);
                whitelistContainer.appendChild(friendItem);
            });

            document.body.appendChild(whitelistContainer);
            updateEstimatedTime(friendsList.filter(friend => !whitelist.includes(friend.id)).length);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch friends.');
        }
    });

    removeFriendsButton.addEventListener('click', async () => {
        if (!authToken) {
            alert('Please set your token first.');
            return;
        }

        try {
            const response = await fetch('/api/v9/users/@me/relationships', {
                headers: {
                    'Authorization': authToken
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch friends');
            }

            const friends = await response.json();
            const friendsToRemove = friends.filter(friend => !whitelist.includes(friend.id));

            statusBar.textContent = `Found ${friendsToRemove.length} friends to remove.`;
            updateEstimatedTime(friendsToRemove.length); // Update the estimated time when removal starts

            const totalFriendsToRemove = friendsToRemove.length;
            let removedFriendsCount = 0;

            for (let i = 0; i < friendsToRemove.length; i++) {
                const friend = friendsToRemove[i];

                try {
                    const deleteRequest = () => {
                        return fetch(`/api/v9/users/@me/relationships/${friend.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': authToken
                            }
                        });
                    };

                    const event = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true
                    });

                    await deleteRequest().then(() => {
                        console.log(`Removed friend ${friend.id}, waiting before next removal...`);
                        statusBar.textContent = `Removed friend ${i + 1} of ${friendsToRemove.length}.`;
                        removedFriendsCount++;
                    });

                    const delayTime = randomDelay(6000, 12000);
                    console.log(`Waiting for ${delayTime} ms before next request`);
                    await new Promise(resolve => setTimeout(resolve, delayTime));

                    const remainingFriends = totalFriendsToRemove - removedFriendsCount;
                    const remainingTime = remainingFriends * (delayTime / 1000);
                    const minutes = Math.floor(remainingTime / 60);
                    const seconds = Math.floor(remainingTime % 60);
                    statusBarEstimatedTime.textContent = `Estimated time remaining: ${minutes}m ${seconds}s`;

                } catch (error) {
                    console.error(`Failed to remove friend ${friend.id}:`, error);
                }
            }

            statusBar.textContent = 'Completed removing non-whitelisted friends.';
            statusBarEstimatedTime.textContent = '';
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to remove friends.');
        }
    });
})();