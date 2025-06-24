export const infoUser = [
    {
        label: 'Họ và tên',
        type: "input",
        name: "name",
        span: 24,
        placeholder: 'Họ và tên',
        rules: [{ required: true, message: "Vui lòng nhập Họ và tên" }],
    },
    {
        label: 'Tên người dùng',
        type: "input",
        name: "username",
        span: 24,
        placeholder: 'Tên người dùng',
        rules: [{ required: true, message: "Vui lòng nhập tên người dùng" }],
    },
    {
        label: 'Mật khẩu',
        type: "password",
        name: "password",
        span: 24,
        placeholder: 'Mật khẩu',
        autoComplete: 'new-password',
        rules: [{ required: true, message: "Vui lòng nhập mật khẩu" }],

    },
    {
        label: 'Nhập lại mật khẩu',
        type: "password",
        name: "passwordConfirm",
        span: 24,
        placeholder: 'Nhập lại mật khẩu',
        autoComplete: 'new-password',
        dependencies: ['password'],
        rules: [{ required: true, message: "Vui lòng nhập mật khẩu mới" },
        ({ getFieldValue }: any) => ({
            validator(_: any, value: string) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
            },
        })
        ],
    },
]
