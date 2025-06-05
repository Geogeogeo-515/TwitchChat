// Chat configuration
const config = {
    minViewers: 1000,
    maxViewers: 50000,
    usernames: [
        'Dream', 'Illumina', 'Benex', 'k4yfour', 'Feinberg',
        'Couriway', 'Nerdi', 'Sizzler', 'Pete', 'FireBreathMan',
        'MCSpeedrunner', 'Nether_Runner', 'BiomeSkipper', 'DragonSlayer',
        'BlazePro', 'EnderPearls', 'StrongholdFinder', 'SpeedBridger',
        'NetherPortal', 'BedrockBreaker', 'SpeedCrafter', 'LowestTime',
        'WorldRecorder', 'SubFourteen', 'BlindTravel', 'SeedHunter',
        'BasaltRunner', 'WartFarmer', 'PiglinTrader', 'StrongEyes'
    ],
    donationAmounts: [5, 10, 20, 50, 100, 500, 1000, 5000, 10000],
    raidSizes: [1000, 2000, 5000, 10000, 20000, 50000],
    userColors: [
        '#FF0000', '#0000FF', '#008000', '#B22222', '#FF7F50',
        '#9ACD32', '#FF4500', '#2E8B57', '#DAA520', '#D2691E',
        '#5F9EA0', '#1E90FF', '#FF69B4', '#8A2BE2', '#00FF7F'
    ],
    lyrics: [
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
        "We've known each other for so long",
        "Your heart's been aching but you're too shy to say it",
        "Inside we both know what's been going on",
        "We know the game and we're gonna play it"
    ],
    rickRollReactions: [
        "I can't believe I got Rick Rolled in [CURRENT_YEAR]",
        "This song is actually fire though",
        "Rick Astley never disappoints",
        "Best stream ever",
        "The classic never gets old",
        "Dancing in my room rn",
        "Rick Roll supremacy",
        "This is peak content",
        "Literally timeless",
        "My day is blessed now"
    ],
    streamMilestones: [
        100000, 250000, 500000, 750000, 1000000
    ],
    specialEvents: [
        "HYPE TRAIN INCOMING! 🚂",
        "NEW RECORD! Most viewed Rick Roll stream in history!",
        "TRENDING #1 ON TWITCH!",
        "RICK ASTLEY HIMSELF MIGHT JOIN THE STREAM!",
        "THIS IS NOW IN TWITCH HISTORY!",
        "BREAKING THE INTERNET RIGHT NOW!"
    ],
    worldRecords: [
        "Most viewers in a single stream",
        "Fastest growing stream in history",
        "Most concurrent Rick Rolls",
        "Longest continuous Rick Roll",
        "Most donations in 24 hours",
        "Biggest raid train ever"
    ],
    challenges: [
        "Get 1M viewers",
        "Break 5 world records",
        "Complete level 5 hype train",
        "Reach #1 on trending",
        "Hit $1M in donations"
    ],
    messageTemplates: {
        greeting: [
            'GL on the runs!',
            'Let\'s get that WR!',
            'Sub 14 today?',
            'Nice seed!',
            'Good luck!',
            'PB incoming!',
            'This is the one!',
            'Perfect spawn!'
        ],
        reaction: [
            'GOOD SPAWN',
            'PERFECT NETHER',
            'POG BASTION',
            'INSANE RNG',
            'GOD SEED',
            'WR PACE',
            'LETS GO',
            'CLUTCH',
            'SO CLOSE',
            'ONE CYCLE'
        ],
        commentary: [
            'That blind was insane!',
            'Perfect pearl trades',
            'God-tier fortress',
            'Crazy bastion luck',
            'Clean nether entry',
            'Nice stronghold',
            'Perfect dragon perch',
            'Smooth inventory',
            'Clean movement',
            'Great routing'
        ],
        reset: [
            'Bad spawn',
            'No village',
            'Unlucky nether',
            'No fortress nearby',
            'Bad trades',
            'No pearls',
            'Far stronghold',
            'Reset',
            'Next seed',
            'Bad RNG'
        ]
    }
};

// Stream state
let streamState = {
    viewers: Math.floor(Math.random() * (config.maxViewers - config.minViewers) + config.minViewers),
    messages: [],
    userColorMap: new Map(),
    lyricIndex: 0,
    viewerMilestoneAnnounced: new Set(),
    streamUptime: 0,
    totalDonations: 0,
    trendingStatus: 1,
    hypeTrain: {
        level: 0,
        progress: 0,
        active: false,
        contributors: new Set()
    },
    raidTrain: {
        active: false,
        count: 0,
        totalRaiders: 0
    },
    videoLoops: 0,
    specialEventActive: false,
    totalAttempts: 0,
    currentRun: {
        active: false,
        startTime: 0,
        netherEntry: null,
        fortress: null,
        stronghold: null,
        isWRPace: false
    },
    stats: {
        sub15Runs: 3,
        goodSeeds: 12,
        dragonFights: 8,
        todayBest: '15:43'
    }
};

// DOM elements
const elements = {
    chatMessages: document.getElementById('chatMessages'),
    messageInput: document.getElementById('messageInput'),
    sendButton: document.getElementById('sendButton'),
    viewerCount: document.getElementById('viewerCount'),
    toggleTheme: document.getElementById('toggleTheme'),
    video: document.getElementById('streamVideo'),
    streamTime: document.getElementById('streamTime'),
    trendingRank: document.getElementById('trendingRank'),
    activeEvents: document.getElementById('activeEvents'),
    hypeTrainContainer: document.getElementById('hypeTrainContainer'),
    raidTrainContainer: document.getElementById('raidTrainContainer'),
    wrDiff: document.getElementById('wrDiff'),
    netherSplit: document.getElementById('netherSplit'),
    fortressSplit: document.getElementById('fortressSplit'),
    strongholdSplit: document.getElementById('strongholdSplit'),
    attemptCount: document.getElementById('attemptCount'),
    todayBest: document.getElementById('todayBest'),
    sub15Count: document.getElementById('sub15Count'),
    goodSeedCount: document.getElementById('goodSeedCount'),
    dragonCount: document.getElementById('dragonCount')
};

// Stream data
const streams = {
    rickroll: {
        title: "Rickrolling Twitch Chat!",
        streamer: "Pepe the Streamer",
        category: "Music",
        description: "Join us for the biggest Rick Roll event in Twitch history! We're breaking records and making history!",
        tags: ["Entertainment", "Music", "Memes"],
        videoSrc: "Rick Roll.mp4"
    },
    stream2: {
        title: "PUBG Solo Grinding! | Road to Top 100",
        streamer: "Gamer boyz",
        category: "PUBG: BATTLEGROUNDS",
        description: "Solo queue adventures! Trying to reach Top 100 in NA. Currently Rank: Diamond 2",
        tags: ["FPS", "Battle Royale", "Competitive"],
        videoSrc: "4291570-hd_1920_1080_30fps.mp4"
    },
    stream3: {
        title: "Speed Running!",
        streamer: "Gaming Pro",
        category: "Gaming",
        description: "Attempting new world records in speed running!",
        tags: ["Gaming", "SpeedRun", "Competitive"],
        videoSrc: "Rick Roll.mp4" // This will be changed later
    },
    stream4: {
        title: "Digital Art Stream!",
        streamer: "Art Master",
        category: "Art",
        description: "Creating digital art and taking requests!",
        tags: ["Art", "Creative", "Digital"],
        videoSrc: "Rick Roll.mp4" // This will be changed later
    }
};

// Helper functions
function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getUserColor(username) {
    if (!streamState.userColorMap.has(username)) {
        streamState.userColorMap.set(username, randomFromArray(config.userColors));
    }
    return streamState.userColorMap.get(username);
}

function formatMessage(text, username, type = 'normal', extra = {}) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const userColor = getUserColor(username);
    let content = '';
    
    if (type === 'donation') {
        content = `
            <span class="donation-amount">$${extra.amount} donation</span><br>
            <span class="username" style="color: ${userColor}">${username}:</span> ${text}
        `;
    } else if (type === 'raid') {
        content = `
            <span class="username" style="color: ${userColor}">${username}</span> raids with ${extra.raiders} viewers! Welcome raiders!
        `;
    } else {
        content = `<span class="username" style="color: ${userColor}">${username}:</span> ${text}`;
    }
    
    messageDiv.innerHTML = content;
    return messageDiv;
}

function addMessage(messageElement) {
    elements.chatMessages.appendChild(messageElement);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    
    // Keep only last 200 messages
    if (elements.chatMessages.children.length > 200) {
        elements.chatMessages.removeChild(elements.chatMessages.children[0]);
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateStreamStats() {
    streamState.streamUptime++;
    const hours = Math.floor(streamState.streamUptime / 3600);
    const minutes = Math.floor((streamState.streamUptime % 3600) / 60);
    
    if (streamState.streamUptime % 900 === 0) { // Every 15 minutes
        const message = `Stream Stats: ${hours}h ${minutes}m uptime | $${formatNumber(streamState.totalDonations)} donated | Peak: ${formatNumber(Math.max(...Array.from(streamState.viewerMilestoneAnnounced)))} viewers | #${streamState.trendingStatus} Trending`;
        addMessage(formatMessage(message, 'StreamAnnouncer', 'stats'));
    }
}

function startHypeTrain() {
    if (!streamState.hypeTrain.active && Math.random() < 0.1) { // 10% chance to start hype train
        streamState.hypeTrain.active = true;
        streamState.hypeTrain.level = 1;
        streamState.hypeTrain.progress = 0;
        
        addMessage(formatMessage("HYPE TRAIN STARTED! Let's break some records!", 'StreamAnnouncer', 'hype'));
        
        // Hype train timer
        const hypeInterval = setInterval(() => {
            streamState.hypeTrain.progress += Math.random() * 20;
            
            if (streamState.hypeTrain.progress >= 100) {
                streamState.hypeTrain.level++;
                streamState.hypeTrain.progress = 0;
                
                if (streamState.hypeTrain.level <= 5) {
                    addMessage(formatMessage(`HYPE TRAIN LEVEL ${streamState.hypeTrain.level}! KEEP IT GOING!`, 'StreamAnnouncer', 'hype'));
                    
                    // Add bonus viewers for hype train
                    streamState.viewers += Math.floor(Math.random() * 50000) + 10000;
                    updateViewerCount();
                } else {
                    addMessage(formatMessage("HYPE TRAIN COMPLETED! NEW RECORD!", 'StreamAnnouncer', 'hype'));
                    streamState.hypeTrain.active = false;
                    clearInterval(hypeInterval);
                }
            }
        }, 5000);
    }
}

function simulateSpecialEvent() {
    if (Math.random() < 0.05) { // 5% chance every interval
        const event = randomFromArray(config.specialEvents);
        addMessage(formatMessage(event, 'StreamAnnouncer', 'special'));
        
        // Bonus viewers for special events
        streamState.viewers += Math.floor(Math.random() * 100000) + 50000;
        updateViewerCount();
        
        // Update trending status
        streamState.trendingStatus = Math.max(1, Math.min(10, streamState.trendingStatus - Math.floor(Math.random() * 3)));
    }
}

function simulateLyricChain() {
    const username = randomFromArray(config.usernames);
    const currentLyric = config.lyrics[streamState.lyricIndex];
    
    if (Math.random() < 0.8) {
        addMessage(formatMessage(currentLyric, username));
        streamState.lyricIndex = (streamState.lyricIndex + 1) % config.lyrics.length;
        
        // Simulate more users joining the chain
        const chainLength = Math.floor(Math.random() * 5) + 3; // 3-7 users join
        for (let i = 0; i < chainLength; i++) {
            setTimeout(() => {
                const chainUser = randomFromArray(config.usernames);
                addMessage(formatMessage(currentLyric, chainUser));
            }, i * 200); // Faster timing between chain messages
        }
    } else {
        // Multiple reactions when chain breaks
        const numReactions = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < numReactions; i++) {
            setTimeout(() => {
                const reactionUser = randomFromArray(config.usernames);
                addMessage(formatMessage(randomFromArray(config.rickRollReactions).replace('[CURRENT_YEAR]', new Date().getFullYear()), reactionUser));
            }, i * 300);
        }
        streamState.lyricIndex = 0;
    }
}

// Chat events
function simulateDonation() {
    const username = randomFromArray(config.usernames);
    const amount = randomFromArray(config.donationAmounts);
    streamState.totalDonations += amount;
    
    const messages = [
        'Thank you for the amazing stream!',
        'Keep up the great work!',
        'You\'re the best streamer!',
        'Love your content!',
        'This stream made my day!',
        'Always supporting!',
        'Been here since day one!',
        'You deserve this!',
        'Keep grinding!',
        'Thanks for the entertainment!',
        "Rick Roll is life!",
        "Worth every penny for this masterpiece",
        "Take my money for this quality content",
        "Supporting the cause",
        "For the culture!"
    ];
    
    addMessage(formatMessage(
        randomFromArray(messages),
        username,
        'donation',
        { amount }
    ));
}

function simulateRaid(isRaidTrain = false) {
    const username = randomFromArray(config.usernames);
    const raiders = randomFromArray(config.raidSizes);
    
    if (isRaidTrain) {
        streamState.raidTrain.totalRaiders += raiders;
    }
    
    addMessage(formatMessage(
        '',
        username,
        'raid',
        { raiders }
    ));
    
    setTimeout(() => {
        const numMessages = Math.min(raiders / 30, 30);
        for (let i = 0; i < numMessages; i++) {
            setTimeout(() => {
                const raider = randomFromArray(config.usernames);
                const messages = [
                    'RAID HYPE!',
                    'Let\'s go!',
                    `${username} sent us!`,
                    'Raid party!',
                    'New viewer here!',
                    'Happy to be here!',
                    'Raid squad!',
                    'Coming from the raid!',
                    'Thanks for the raid!',
                    'Raid fam!'
                ];
                addMessage(formatMessage(randomFromArray(messages), raider));
            }, i * 100);
        }
    }, 500);
    
    streamState.viewers += Math.floor(raiders * 0.8);
    updateViewerCount();
}

function simulateChat() {
    // Generate 2-4 messages at once
    const numMessages = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < numMessages; i++) {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                simulateLyricChain();
            } else {
                const username = randomFromArray(config.usernames);
                const messageType = randomFromArray(Object.keys(config.messageTemplates));
                const message = randomFromArray(config.messageTemplates[messageType]);
                addMessage(formatMessage(message, username));
            }
        }, i * 200);
    }
}

function updateViewerCount() {
    const formattedCount = formatNumber(streamState.viewers);
    elements.viewerCount.textContent = formattedCount;
    document.title = `${formattedCount} viewers - Rick Roll Stream`;
}

function announceViewerMilestone(viewerCount) {
    const milestone = config.streamMilestones.find(m => viewerCount >= m && !streamState.viewerMilestoneAnnounced.has(m));
    
    if (milestone) {
        streamState.viewerMilestoneAnnounced.add(milestone);
        const message = `🔥 INCREDIBLE MILESTONE: ${formatNumber(milestone)} VIEWERS! THIS IS HISTORIC!`;
        addMessage(formatMessage(message, 'StreamAnnouncer', 'milestone'));
        
        // Start hype train on milestones
        if (!streamState.hypeTrain.active) {
            startHypeTrain();
        }
    }
}

// User interaction
function handleUserMessage() {
    const message = elements.messageInput.value.trim();
    if (!message) return;
    
    addMessage(formatMessage(message, 'You'));
    elements.messageInput.value = '';
    
    // Generate more reactions faster
    const numReactions = Math.floor(Math.random() * 5) + 3; // 3-7 reactions
    for (let i = 0; i < numReactions; i++) {
        setTimeout(() => {
            const username = randomFromArray(config.usernames);
            const reaction = randomFromArray(config.messageTemplates.reaction);
            addMessage(formatMessage(reaction, username));
        }, (i + 1) * 300); // Faster reaction timing
    }
}

// Event listeners
elements.sendButton.addEventListener('click', handleUserMessage);
elements.messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

elements.video.addEventListener('play', () => {
    addMessage(formatMessage("THE RICK ROLL BEGINS!", 'StreamAnnouncer', 'announcement'));
});

elements.video.addEventListener('ended', () => {
    streamState.videoLoops++;
    streamState.lyricIndex = 0;
    addMessage(formatMessage(`Rick Roll Counter: ${streamState.videoLoops}`, 'StreamAnnouncer', 'stats'));
});

// Start simulations with even more frequent updates
setInterval(simulateChat, 400); // Super fast chat
setInterval(simulateDonation, 5000); // Very frequent donations
setInterval(() => simulateRaid(false), 15000); // More frequent raids
setInterval(simulateSpecialEvent, 20000); // More frequent special events
setInterval(() => {
    streamState.viewers += Math.floor(Math.random() * 100000) - 50000;
    streamState.viewers = Math.max(config.minViewers, Math.min(config.maxViewers, streamState.viewers));
    updateViewerCount();
    announceViewerMilestone(streamState.viewers);
    startHypeTrain();
    checkWorldRecords();
    startRaidTrain();
    checkChallenges();
}, 5000);

setInterval(updateStreamStats, 1000);

// Initial setup
updateViewerCount();
addMessage(formatMessage("Welcome to the BIGGEST Rick Roll stream in history! Let's break some records!", 'StreamAnnouncer', 'announcement'));

function checkWorldRecords() {
    if (!streamState.worldRecordAttempt && Math.random() < 0.1) {
        streamState.worldRecordAttempt = {
            record: randomFromArray(config.worldRecords),
            progress: 0,
            target: 100,
            timeLeft: 60
        };
        
        addMessage(formatMessage(`🏆 WORLD RECORD ATTEMPT STARTING: ${streamState.worldRecordAttempt.record}!`, 'StreamAnnouncer', 'record'));
        
        const recordInterval = setInterval(() => {
            if (streamState.worldRecordAttempt) {
                streamState.worldRecordAttempt.progress += Math.random() * 20;
                streamState.worldRecordAttempt.timeLeft--;
                
                if (streamState.worldRecordAttempt.progress >= 100) {
                    const record = streamState.worldRecordAttempt.record;
                    streamState.recordsBroken.add(record);
                    addMessage(formatMessage(`🏆 WORLD RECORD BROKEN: ${record}!`, 'StreamAnnouncer', 'record'));
                    streamState.worldRecordAttempt = null;
                    clearInterval(recordInterval);
                    
                    // Bonus viewers for breaking record
                    streamState.viewers += Math.floor(Math.random() * 200000) + 100000;
                    updateViewerCount();
                    startHypeTrain();
                } else if (streamState.worldRecordAttempt.timeLeft <= 0) {
                    addMessage(formatMessage(`Record attempt failed! We'll get it next time!`, 'StreamAnnouncer', 'record'));
                    streamState.worldRecordAttempt = null;
                    clearInterval(recordInterval);
                }
            }
        }, 1000);
    }
}

function startRaidTrain() {
    if (!streamState.raidTrain.active && Math.random() < 0.1) {
        streamState.raidTrain.active = true;
        streamState.raidTrain.count = 0;
        streamState.raidTrain.totalRaiders = 0;
        
        addMessage(formatMessage("🚂 RAID TRAIN STARTING! Multiple raids incoming!", 'StreamAnnouncer', 'raidTrain'));
        
        const raidInterval = setInterval(() => {
            if (streamState.raidTrain.count < 5) {
                simulateRaid(true);
                streamState.raidTrain.count++;
            } else {
                addMessage(formatMessage(`RAID TRAIN ENDED! Total raiders: ${formatNumber(streamState.raidTrain.totalRaiders)}!`, 'StreamAnnouncer', 'raidTrain'));
                streamState.raidTrain.active = false;
                clearInterval(raidInterval);
            }
        }, 5000);
    }
}

function checkChallenges() {
    config.challenges.forEach(challenge => {
        if (!streamState.challengesCompleted.has(challenge)) {
            let completed = false;
            
            switch (challenge) {
                case "Get 1M viewers":
                    completed = streamState.viewers >= 1000000;
                    break;
                case "Break 5 world records":
                    completed = streamState.recordsBroken.size >= 5;
                    break;
                case "Complete level 5 hype train":
                    completed = streamState.hypeTrain.level >= 5;
                    break;
                case "Reach #1 on trending":
                    completed = streamState.trendingStatus === 1;
                    break;
                case "Hit $1M in donations":
                    completed = streamState.totalDonations >= 1000000;
                    break;
            }
            
            if (completed) {
                streamState.challengesCompleted.add(challenge);
                addMessage(formatMessage(`🎯 CHALLENGE COMPLETED: ${challenge}!`, 'StreamAnnouncer', 'challenge'));
                startHypeTrain();
            }
        }
    });
}

// Update stream time
function updateStreamTime() {
    const hours = Math.floor(streamState.streamUptime / 3600);
    const minutes = Math.floor((streamState.streamUptime % 3600) / 60);
    const seconds = streamState.streamUptime % 60;
    elements.streamTime.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update trending rank
function updateTrendingRank() {
    elements.trendingRank.textContent = `#${streamState.trendingStatus}`;
}

// Update active events
function updateActiveEvents() {
    let eventsHtml = '';
    
    if (streamState.hypeTrain.active) {
        eventsHtml += `
            <div class="event-item">
                <div>Hype Train Level ${streamState.hypeTrain.level}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${streamState.hypeTrain.progress}%"></div>
                </div>
            </div>
        `;
    }
    
    if (streamState.raidTrain.active) {
        eventsHtml += `
            <div class="event-item">
                <div>Raid Train: ${streamState.raidTrain.count}/5</div>
                <div>Total Raiders: ${formatNumber(streamState.raidTrain.totalRaiders)}</div>
            </div>
        `;
    }
    
    elements.activeEvents.innerHTML = eventsHtml;
}

// Update event tracker
function updateEventTracker() {
    if (streamState.hypeTrain.active) {
        elements.hypeTrainContainer.innerHTML = `
            <div class="event-progress">
                <div>Hype Train Level ${streamState.hypeTrain.level}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${streamState.hypeTrain.progress}%"></div>
                </div>
            </div>
        `;
    } else {
        elements.hypeTrainContainer.innerHTML = '';
    }
    
    if (streamState.raidTrain.active) {
        elements.raidTrainContainer.innerHTML = `
            <div class="event-progress">
                <div>Raid Train Progress</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(streamState.raidTrain.count / 5) * 100}%"></div>
                </div>
                <div>Raids: ${streamState.raidTrain.count}/5</div>
            </div>
        `;
    } else {
        elements.raidTrainContainer.innerHTML = '';
    }
}

// Add to the existing interval updates
setInterval(() => {
    streamState.streamUptime++;
    updateStreamTime();
    updateTrendingRank();
    updateActiveEvents();
    updateEventTracker();
}, 1000);

// Message generation
function generateRandomMessage() {
    const messageTypes = ['greeting', 'reaction', 'commentary', 'reset'];
    const messageType = randomFromArray(messageTypes);
    const username = randomFromArray(config.usernames);
    const message = randomFromArray(config.messageTemplates[messageType]);
    
    addMessage(formatMessage(message, username));
}

// Start simulation
startNewRun();
setInterval(generateRandomMessage, 60000);
setInterval(updateRunProgress, 1000);
setInterval(() => {
    streamState.streamUptime++;
    elements.streamTime.textContent = formatTime(streamState.streamUptime);
    
    // Update viewers
    streamState.viewers += Math.floor(Math.random() * 1000) - 500;
    streamState.viewers = Math.max(config.minViewers, Math.min(config.maxViewers, streamState.viewers));
    elements.viewerCount.textContent = formatNumber(streamState.viewers);
}, 1000);

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateSplitTime(element, time, isAhead) {
    element.textContent = formatTime(time);
    element.className = 'split-time ' + (isAhead ? 'ahead' : 'behind');
}

function startNewRun() {
    streamState.currentRun = {
        active: true,
        startTime: Date.now(),
        netherEntry: null,
        fortress: null,
        stronghold: null,
        isWRPace: Math.random() > 0.7
    };
    streamState.totalAttempts++;
    elements.attemptCount.textContent = streamState.totalAttempts;
}

function updateRunProgress() {
    if (!streamState.currentRun.active) return;

    const currentTime = (Date.now() - streamState.currentRun.startTime) / 1000;
    
    // Simulate run progress
    if (currentTime > 150 && !streamState.currentRun.netherEntry) {
        streamState.currentRun.netherEntry = currentTime;
        updateSplitTime(elements.netherSplit, currentTime, currentTime < 165);
        addMessage(formatMessage(randomFromArray(config.messageTemplates.reaction), randomFromArray(config.usernames)));
    }
    
    if (currentTime > 270 && !streamState.currentRun.fortress) {
        streamState.currentRun.fortress = currentTime;
        updateSplitTime(elements.fortressSplit, currentTime, currentTime < 285);
        addMessage(formatMessage(randomFromArray(config.messageTemplates.commentary), randomFromArray(config.usernames)));
    }
    
    if (currentTime > 680 && !streamState.currentRun.stronghold) {
        streamState.currentRun.stronghold = currentTime;
        updateSplitTime(elements.strongholdSplit, currentTime, currentTime < 695);
        
        // 20% chance to finish the run
        if (Math.random() < 0.2) {
            const finalTime = currentTime + Math.floor(Math.random() * 120) + 60;
            if (finalTime < 900) { // Sub 15
                streamState.stats.sub15Runs++;
                elements.sub15Count.textContent = streamState.stats.sub15Runs;
                if (finalTime < parseFloat(streamState.stats.todayBest)) {
                    streamState.stats.todayBest = formatTime(finalTime);
                    elements.todayBest.textContent = streamState.stats.todayBest;
                }
            }
            streamState.stats.dragonFights++;
            elements.dragonCount.textContent = streamState.stats.dragonFights;
            resetRun();
        }
    }

    // Update WR pace
    if (streamState.currentRun.isWRPace) {
        const diff = Math.floor(Math.random() * 30) - 15;
        elements.wrDiff.textContent = (diff >= 0 ? '+' : '-') + formatTime(Math.abs(diff));
        elements.wrDiff.className = diff >= 0 ? 'wr-diff behind' : 'wr-diff';
    }
}

function resetRun() {
    if (Math.random() < 0.3) { // 30% chance to count as a good seed
        streamState.stats.goodSeeds++;
        elements.goodSeedCount.textContent = streamState.stats.goodSeeds;
    }
    streamState.currentRun.active = false;
    elements.netherSplit.textContent = '--:--';
    elements.fortressSplit.textContent = '--:--';
    elements.strongholdSplit.textContent = '--:--';
    elements.wrDiff.textContent = '--:--';
    
    // Start new run after short delay
    setTimeout(startNewRun, Math.random() * 3000 + 1000);
} 