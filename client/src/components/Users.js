const users = [
    {
        username: 'Idk',
        display_name: 'Idk',
        verified: false,
        profile_picture: '/images/profile_pictures/Idk.jpg',
        followers: 0,
        following: 0,
        posts: [],
    },
    {
        username: 'admin',
        display_name: 'Admin',
        verified: true,
        profile_picture: '/images/profile_pictures/admin.jpg',
        followers: 17364,
        following: 2,
        posts: [],
    },
    {
        username: 'noob',
        display_name: 'Noob',
        verified: false,
        profile_picture: null,
        followers: 0,
        following: 0,
        posts: [
            {
                id: 'FOOODD',
                caption: 'Idk i like',
                source: 'https://images.unsplash.com/photo-1667892465351-4c999c5a8c4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
                timestamp: 1668769588,
            },
        ],
    },
    {
        username: 'Shaquille',
        display_name: 'Shaquille',
        verified: true,
        profile_picture: '/images/profile_pictures/shaquille.jpg',
        followers: 10,
        following: 10,
        posts: [
            {
                id: 'ELIE',
                caption: 'This is elmo!',
                source: 'https://images.unsplash.com/photo-1581195234513-4dccee3e1898?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
                timestamp: 1652864788,
            }
        ],
    },
    {
        username: 'Esmaybe',
        display_name: 'Esmay',
        verified: true,
        profile_picture: '/images/profile_pictures/esmay.jpg',
        followers: 32767,
        following: 12,
        posts: [
            {
                id: 'IHATETHIS',
                caption: 'Hello World',
                source: 'https://images.unsplash.com/photo-1667387322417-c434fa1f563d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
                timestamp: 1613642788,
            },
            {
                id: 'CODE',
                caption: 'This is code',
                source: 'https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
                timestamp: 1668782140,
            }
        ],
    }
]

export default users;