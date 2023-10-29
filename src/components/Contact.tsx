
'use client'
import { useState } from 'react';
import axios from 'axios';




const FeedbackButton: React.FC = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [isEmailSent, setEmailSent] = useState(false); 

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const message = e.target.message.value;
  
    try {
      const response = await axios.post('/api/send', { email, message });
      console.log('Email envoyé avec succès:', response.data);
      setEmailSent(true);
    } catch (error) {
      console.log('Erreur lors de l\'envoi de l\'email:', error);
      setEmailSent(false);
    }
  };
  
 
  const formStyle = "absolute mt-2 bg-white p-4 rounded shadow-lg w-60 h-auto z-10";


  return (
    <div className='relative' >
<button className='text-slate-900 font-bold py-2 px-4 rounded-full hover:bg-gray-300 hover:shadow-md transition-all duration-500' onClick={() => setInputVisible(!isInputVisible)}>
 Contact support
</button>
      {isInputVisible && (
        <form 
        className={formStyle}
        onSubmit={handleSubmit}
        >
         <input 
  type='email' 
  name='email' 
  placeholder='Votre Email' 
  className="p-2 border rounded w-full mb-2 text-black"
/>
<textarea 
  
  placeholder="Votre Message..." 
  name='message'

  className="p-2 border rounded w-full mb-2 text-black"
/>
{isEmailSent && <div className="text-green-700 font-semibold">Votre message a bien été envoyé.</div>} {/* Afficher le message si l'email est envoyé */}
          <button 
            className='bg-black text-white font-bold py-2 px-4 rounded' 
            type="submit" 
           
          >
            Envoyer
          </button>
          
        </form>
      )}
    </div>
  );
      };
  export default FeedbackButton;
  