import AuthLayout from './auth-layout';

const Login = () => {
	return (
		<div>
			<h1 className='text-2xl font-bold mb-4'>Đăng nhập</h1>
			<form>
				<input type='email' placeholder='Email' className='w-full p-2 mb-3 border rounded' />
				<input type='password' placeholder='Mật khẩu' className='w-full p-2 mb-3 border rounded' />
				<button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>
					Đăng nhập
				</button>
			</form>
		</div>
	);
};

Login.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Login;
