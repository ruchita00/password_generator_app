import { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';

const generatePassword = ({
  passwordLength = 8,
  number = undefined,
  alphabets = undefined,
  specialchar = undefined,
}) => {
  let characters = '';
  if (number) {
    characters += '0123456789';
  }
  if (alphabets) {
    characters += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (specialchar) {
    characters += '!@#$%^&*()-_=+[]{};:,.<>?';
  }
  if (!characters) {
    return 'Error: value not selected.';
  }
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters?.length);
    password += characters?.charAt(randomIndex);
  }
  return password;
};

function App() {
  const [isCopied, setIsCopied] = useState(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState({
    passwordLength: 8,
    number: true,
    alphabets: true,
    specialchar: true,
  });
  const [prevPasswordList, setPrevPasswordList] = useState(
    JSON.parse(localStorage.getItem('prevPasswordList')) || []
  );



  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'passwordLength') {
      setPasswordInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      setPasswordInfo((prev) => ({ ...prev, [name]: checked }));
    }
  };




  const handleCopy = (idx) => {
    setIsCopied(idx);
    navigator.clipboard
      .writeText(prevPasswordList[idx])
      .then(() => setHasCopied(true));
  };



  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const { passwordLength, number, alphabets, specialchar } = passwordInfo;
    const password = generatePassword({
      passwordLength,
      number,
      alphabets,
      specialchar,
    });
    if (password?.includes('Error')) {
      alert(password);
      return null;
    }
    setIsCopied(false);
    setPrevPasswordList(() => [password, ...prevPasswordList.slice(0, 4)]);
    localStorage.setItem(
      'prevPasswordList',
      JSON.stringify([password, ...prevPasswordList.slice(0, 4)])
    );
  };



  const handleClear = () => {
    setPrevPasswordList([]);
    localStorage.removeItem('prevPasswordList');
    setPasswordInfo({
      passwordLength: undefined,
      number: false,
      alphabets: false,
      specialchar: false,
    });
  };


  
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        padding: '4rem 8rem',
        backgroundColor: '#f2f5f4',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          color: '#000000',
          fontWeight: 600,
        }}
      >
        Random password generator
      </h1>
      <div style={{ display: 'flex', marginTop: '4rem' }}>
        <form
          onSubmit={handleSubmit}
          onReset={handleClear}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            gap: '0.4rem',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
          >
            <label
              htmlFor='passwordLength'
              style={{ fontWeight: 500, fontSize: '0.9rem' }}
            >
              Select password length
            </label>
            <input
              type='number'
              name='passwordLength'
              placeholder='0'
              onChange={handleChange}
              value={passwordInfo?.passwordLength}
              min={8}
              style={{
                width: '4rem',
                padding: '0.5rem',
                outline: 'none',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <h3 style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            Includes following in your password:
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type='checkbox'
              name='number'
              placeholder='Enter number'
              onChange={handleChange}
              checked={passwordInfo?.number}
              style={{ height: '1.2rem', width: '1.2rem' }}
            />
            <label htmlFor='number'>Numbers</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type='checkbox'
              name='alphabets'
              placeholder='Enter alphabets'
              onChange={handleChange}
              checked={passwordInfo?.alphabets}
              style={{ height: '1.2rem', width: '1.2rem' }}
            />
            <label htmlFor='alphabets'>Alphabets</label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type='checkbox'
              name='specialchar'
              placeholder='Enter special character'
              onChange={handleChange}
              checked={passwordInfo?.specialchar}
              style={{ height: '1.2rem', width: '1.2rem' }}
            />
            <label htmlFor='specialchar'>Special characters</label>
          </div>
          <button
            type='submit'
            style={{
              marginTop: '2rem',
              maxWidth: '25vw',
              padding: '1rem',
              outline: 'none',
              background: '#036FCB',
              color: 'white',
              border: 'none',
              fontSize: '1rem',
              letterSpacing: '0.07rem',
            }}
          >
            Generate password
          </button>
          <button
            type='button'
            onClick={handleClear}
            style={{
              marginTop: '1rem',
              maxWidth: '25vw',
              padding: '1rem',
              outline: 'none',
              background: 'red',
              color: 'white',
              border: 'none',
              fontSize: '1rem',
              letterSpacing: '0.07rem',
            }}
          >
            Clear
          </button>
        </form>
        <div
          className='prevPassword'
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            width: '100%',
            maxHeight: '55vh',
            padding: '1rem',
          }}
        >
          <h4>Generated passwords:</h4>
          <ul
            style={{
              listStyle: 'none',
              minHeight: 'fit-content',
              width: '100%',
              border: '1px solid #fff',
              marginTop: '0.5rem',
              padding: '0.5rem',
            }}
          >
            {prevPasswordList?.length > 0 ? (
              prevPasswordList?.map((listItem, idx) => {
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.5rem',
                    }}
                  >
                    <span style={{ marginRight: '0.5rem' }}>
                      {prevPasswordList?.length - idx}.
                    </span>
                    <li
                      style={{
                        padding: ' 0.6rem',
                        backgroundColor: 'rgb(255, 255, 255)',
                        border: '1px solid #ccc',
                        flex: 0.95,
                        fontSize: '1rem',
                        fontWeight: 400,
                        letterSpacing: '2px',
                      }}
                      value={listItem}
                    >
                      {listItem}
                      <span
                        onClick={() => handleCopy(idx)}
                        style={{
                          float: 'right',
                          border: '1px solid #ccc',
                          padding: '0.3rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '0.7rem',
                          borderRadius: '0.2rem',
                          letterSpacing: '0',
                          width: '2.5rem',
                          height: '1.8rem',
                          position: 'relative',
                        }}
                      >
                        {isCopied === idx && hasCopied && (
                          <span
                            style={{
                              position: 'absolute',
                              bottom: '-2rem',
                              left: '0px',
                              backgroundColor: 'gray',
                              border: '1px solid #d0d0d0',
                              padding: '0.3rem',
                              fontSize: '0.5rem',
                              borderRadius: '0.3rem',
                              zIndex: 999,
                              color: '#FFFFFF',
                            }}
                          >
                            <span
                              style={{
                                width: '1rem',
                                height: '1rem',
                                backgroundColor: 'gray',
                                marginTop: '-0.8rem',
                                position: 'absolute',
                                marginLeft: '0.4rem',
                                zIndex: 0,
                                clipPath:
                                  'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
                              }}
                            ></span>
                            Copied
                          </span>
                        )}
                        {isCopied === idx ? (
                          <DoneIcon
                            style={{
                              fontSize: '1rem',
                              color: 'green',
                              width: '1.2rem',
                              height: '1.2rem',
                            }}
                          />
                        ) : (
                          'copy'
                        )}
                      </span>
                    </li>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                No password generated yet
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;