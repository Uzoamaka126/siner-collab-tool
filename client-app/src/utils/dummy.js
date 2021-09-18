export const workspacesTypes = [
    {
        id: 1,
        name: 'Art'
    },
    {
        id: 2,
        name: 'Business'
    },
    {
        id: 3,
        name: 'Creative Projects'
    },
    {
        id: 4,
        name: 'Small Business'
    },
    {
        id: 5,
        name: 'Design'
    },
    {
        id: 6,
        name: 'Marketing'
    },
    {
        id: 7,
        name: 'Operations'
    },
    {
        id: 8,
        name: 'Sales/CRM'
    },
    {
        id: 9,
        name: 'Others'
    },
]

export const createdWorkspaces = [
    {
        id: '12234',
        name: 'Workspace 1',
        type: 'Marketing',
        members: [
            {
                id: '46789',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Admin',
            },
             {
                id: '1232dfxxc',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Member',
            }
        ],
        list: [
            {
                id: '12234',
                name: 'Untitled ',
                type: 'Marketing',
                tasks: [
                    {
                        id: '122qws34',
                        title: 'Workspace 1',
                        asignee: {
                            name: 'Uzoamaka Anyanwu',
                            email: 'uzo@gmail.com'
                        },
                        due_date: new Date(),
                        priority: 'low',
                        description: 'This is a test task',
                        isCompleted: false,
                        comments: [
                            {
                                id: 'dewdsf12',
                                createdAt: new Date(),
                                updatedAt: new Date()
                            }
                        ]
                    }
                ]
            },
             {
                id: '1232dfxxc',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Member',
            }
        ]
    },
    {
        id: '567890',
        name: 'Workspace 2',
        type: 'Operations',
        members: [
            {
                id: '1122334',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Admin',
            }
        ],
        list: []
    },
    {
        id: '56789',
        name: 'Workspace 3',
        type: 'Sales & CRM',
        members: [
            {
                id: '1122334',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Admin',
            }
        ],
        list: []
    },
]