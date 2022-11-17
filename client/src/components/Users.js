const users = [
    {
        username: 'Idk',
        display_name: 'Idk',
        verified: false,
        profile_picture: '/images/profile_pictures/Idk.jpg',
    },
    {
        username: 'admin',
        display_name: 'Admin',
        verified: true,
        profile_picture: '/images/profile_pictures/admin.jpg',
        posts: [],
    },
    {
        username: 'noob',
        display_name: 'Noob',
        verified: false,
        profile_picture: null,
        posts: [],
    },
    {
        username: 'Shaquille',
        display_name: 'Shaquille',
        verified: true,
        profile_picture: '/images/profile_pictures/shaquille.jpg',
        posts: [
            {
                id: 'ELIE',
                caption: 'This is elmo!',
                source: 'https://images.unsplash.com/photo-1581195234513-4dccee3e1898?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
            }
        ],
    },
    {
        username: 'Esmaybe',
        display_name: 'Esmay',
        verified: true,
        profile_picture: '/images/profile_pictures/esmay.jpg',
        posts: [
            {
                id: 'IHATETHIS',
                caption: 'Hello World',
                source: 'https://images.unsplash.com/photo-1667387322417-c434fa1f563d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
            }
        ],
    }
]

export default users;