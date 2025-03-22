'use client';

import React, { useState } from 'react';
import {
  CognitoUserAttribute,
  userPool,
  CognitoUser,
} from '@/app/lib/cognito';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');

  const handleSignUp = () => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error('SignUp error:', err);
        alert(err.message || 'サインアップ失敗');
        return;
      }

      console.log('SignUp success:', result);
      setStep('confirm');
    });
  };

  const handleConfirm = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error('Confirm error:', err);
        alert(err.message || '確認失敗');
        return;
      }

      console.log('Confirm success:', result);
      alert('登録完了！ログインしてください。');
      setStep('signup');
    });
  };

  return (
    <div style={{ padding: 20 }}>
      {step === 'signup' ? (
        <>
          <h2>サインアップ</h2>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="パスワード（8文字以上）"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button onClick={handleSignUp}>登録</button>
        </>
      ) : (
        <>
          <h2>確認コードを入力</h2>
          <p>メールに届いた確認コードを入力してください。</p>
          <input
            type="text"
            placeholder="確認コード"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          /><br />
          <button onClick={handleConfirm}>確認</button>
        </>
      )}
    </div>
  );
}
