// Yu-Gi-Oh Card Data
const cardData = [
    {
        id: 1,
        name: "Blue-Eyes White Dragon",
        set: "Legend of Blue Eyes White Dragon",
        type: "Monster",
        rarity: "Ultra Rare",
        price: 299.99,
        stock: 5,
        description: "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",
        image: "https://via.placeholder.com/300x400/0066cc/ffffff?text=Blue-Eyes+White+Dragon",
        condition: "Near Mint",
        attack: 3000,
        defense: 2500,
        level: 8,
        attribute: "Light",
        featured: true,
        latest: false
    },
    {
        id: 2,
        name: "Dark Magician",
        set: "Legend of Blue Eyes White Dragon",
        type: "Monster",
        rarity: "Ultra Rare",
        price: 199.99,
        stock: 8,
        description: "The ultimate wizard in terms of attack and defense.",
        image: "https://via.placeholder.com/300x400/660066/ffffff?text=Dark+Magician",
        condition: "Near Mint",
        attack: 2500,
        defense: 2100,
        level: 7,
        attribute: "Dark",
        featured: true,
        latest: false
    },
    {
        id: 3,
        name: "Red-Eyes Black Dragon",
        set: "Metal Raiders",
        type: "Monster",
        rarity: "Ultra Rare",
        price: 179.99,
        stock: 6,
        description: "A ferocious dragon with a deadly attack.",
        image: "https://via.placeholder.com/300x400/cc0000/ffffff?text=Red-Eyes+Black+Dragon",
        condition: "Near Mint",
        attack: 2400,
        defense: 2000,
        level: 7,
        attribute: "Dark",
        featured: true,
        latest: false
    },
    {
        id: 4,
        name: "Summoned Skull",
        set: "Metal Raiders",
        type: "Monster",
        rarity: "Rare",
        price: 89.99,
        stock: 12,
        description: "A fiend with dark powers for confusing the enemy.",
        image: "https://via.placeholder.com/300x400/333333/ffffff?text=Summoned+Skull",
        condition: "Lightly Played",
        attack: 2500,
        defense: 1200,
        level: 6,
        attribute: "Dark",
        featured: false,
        latest: true
    },
    {
        id: 5,
        name: "Monster Reborn",
        set: "Legend of Blue Eyes White Dragon",
        type: "Spell",
        rarity: "Common",
        price: 45.99,
        stock: 25,
        description: "Target 1 monster in either GY; Special Summon it.",
        image: "https://via.placeholder.com/300x400/00cc00/ffffff?text=Monster+Reborn",
        condition: "Near Mint",
        featured: false,
        latest: true
    },
    {
        id: 6,
        name: "Mirror Force",
        set: "Metal Raiders",
        type: "Trap",
        rarity: "Rare",
        price: 65.99,
        stock: 15,
        description: "When an opponent's monster declares an attack: Destroy all Attack Position monsters your opponent controls.",
        image: "https://via.placeholder.com/300x400/cc6600/ffffff?text=Mirror+Force",
        condition: "Near Mint",
        featured: false,
        latest: true
    },
    {
        id: 7,
        name: "Exodia the Forbidden One",
        set: "Legend of Blue Eyes White Dragon",
        type: "Monster",
        rarity: "Secret Rare",
        price: 899.99,
        stock: 2,
        description: "If you have 'Right Leg of the Forbidden One', 'Left Leg of the Forbidden One', 'Right Arm of the Forbidden One' and 'Left Arm of the Forbidden One' in addition to this card in your hand, you win the Duel.",
        image: "https://via.placeholder.com/300x400/cc00cc/ffffff?text=Exodia",
        condition: "Near Mint",
        attack: 1000,
        defense: 1000,
        level: 3,
        attribute: "Dark",
        featured: true,
        latest: false
    },
    {
        id: 8,
        name: "Pot of Greed",
        set: "Magic Ruler",
        type: "Spell",
        rarity: "Common",
        price: 35.99,
        stock: 30,
        description: "Draw 2 cards.",
        image: "https://via.placeholder.com/300x400/00cccc/ffffff?text=Pot+of+Greed",
        condition: "Near Mint",
        featured: false,
        latest: true
    },
    {
        id: 9,
        name: "Harpie Lady",
        set: "Metal Raiders",
        type: "Monster",
        rarity: "Rare",
        price: 55.99,
        stock: 18,
        description: "This human-shaped animal with wings is beautiful to watch but deadly in battle.",
        image: "https://via.placeholder.com/300x400/cc99cc/ffffff?text=Harpie+Lady",
        condition: "Lightly Played",
        attack: 1300,
        defense: 1400,
        level: 4,
        attribute: "Wind",
        featured: false,
        latest: true
    },
    {
        id: 10,
        name: "Swords of Revealing Light",
        set: "Magic Ruler",
        type: "Spell",
        rarity: "Common",
        price: 29.99,
        stock: 22,
        description: "Your opponent's monsters cannot declare an attack during the turn this card is activated.",
        image: "https://via.placeholder.com/300x400/ffff00/000000?text=Swords+of+Light",
        condition: "Near Mint",
        featured: false,
        latest: true
    },
    {
        id: 11,
        name: "Kuriboh",
        set: "Legend of Blue Eyes White Dragon",
        type: "Monster",
        rarity: "Common",
        price: 19.99,
        stock: 35,
        description: "During your opponent's turn, at damage calculation: You can discard this card; you take no battle damage from that battle.",
        image: "https://via.placeholder.com/300x400/cc9966/ffffff?text=Kuriboh",
        condition: "Near Mint",
        attack: 300,
        defense: 200,
        level: 1,
        attribute: "Dark",
        featured: false,
        latest: false
    },
    {
        id: 12,
        name: "Fissure",
        set: "Metal Raiders",
        type: "Spell",
        rarity: "Common",
        price: 25.99,
        stock: 28,
        description: "Destroy the 1 face-up monster your opponent controls with the lowest ATK.",
        image: "https://via.placeholder.com/300x400/996633/ffffff?text=Fissure",
        condition: "Near Mint",
        featured: false,
        latest: false
    },
    {
        id: 13,
        name: "Trap Hole",
        set: "Legend of Blue Eyes White Dragon",
        type: "Trap",
        rarity: "Common",
        price: 22.99,
        stock: 32,
        description: "When your opponent Normal or Flip Summons a monster with 1000 or more ATK: Target that monster; destroy that target.",
        image: "https://via.placeholder.com/300x400/cc3300/ffffff?text=Trap+Hole",
        condition: "Near Mint",
        featured: false,
        latest: false
    },
    {
        id: 14,
        name: "Celtic Guardian",
        set: "Legend of Blue Eyes White Dragon",
        type: "Monster",
        rarity: "Rare",
        price: 75.99,
        stock: 10,
        description: "An elf who learned to wield a sword, he slashes his enemies with lightning-swift attacks.",
        image: "https://via.placeholder.com/300x400/339933/ffffff?text=Celtic+Guardian",
        condition: "Lightly Played",
        attack: 1400,
        defense: 1200,
        level: 4,
        attribute: "Earth",
        featured: false,
        latest: false
    },
    {
        id: 15,
        name: "Dragon Capture Jar",
        set: "Magic Ruler",
        type: "Trap",
        rarity: "Rare",
        price: 85.99,
        stock: 8,
        description: "Change all face-up Dragon-Type monsters to face-down Defense Position.",
        image: "https://via.placeholder.com/300x400/663300/ffffff?text=Dragon+Jar",
        condition: "Near Mint",
        featured: false,
        latest: false
    }
];

// Sample user data
const users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@yugiohstore.com",
        password: "admin123",
        role: "admin"
    },
    {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user"
    }
];

// Sample orders data
const orders = [
    {
        id: 1,
        userId: 2,
        items: [
            { cardId: 1, quantity: 1, price: 299.99 },
            { cardId: 5, quantity: 2, price: 45.99 }
        ],
        total: 391.97,
        status: "Completed",
        date: "2024-01-15"
    },
    {
        id: 2,
        userId: 2,
        items: [
            { cardId: 3, quantity: 1, price: 179.99 }
        ],
        total: 179.99,
        status: "Processing",
        date: "2024-01-20"
    }
];

// Sample reviews data
const reviews = [
    {
        id: 1,
        cardId: 1,
        author: "DuelMaster",
        rating: 5,
        comment: "Amazing card! Perfect condition and fast shipping. Highly recommend!"
    },
    {
        id: 2,
        cardId: 1,
        author: "CardCollector",
        rating: 5,
        comment: "Authentic Blue-Eyes White Dragon. This is the real deal!"
    },
    {
        id: 3,
        cardId: 2,
        author: "SpellCaster",
        rating: 4,
        comment: "Great Dark Magician card. Minor wear but still excellent quality."
    }
];

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cardData, users, orders, reviews };
} 