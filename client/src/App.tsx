import Form from './Form';

const App = () => {
  return (
    <div className='pt-[50px]'>
      <div className='flex px-[50px] flex-col justify-center items-center gap-[30px]'>
        <h1 className='text-white/80 text-center text-[15px] xl:text-[25px]  border-b-[1px]  border-white/30 px-10'>
          Contact Form with Nodemailer
        </h1>
      </div>
      <Form />
    </div>
  );
};

export default App;
