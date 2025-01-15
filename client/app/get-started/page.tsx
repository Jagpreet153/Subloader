'use client' 
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';

function Getstarted() {
  return (
        <div className='flex justify-center items-center h-screen'>
        <FileUploaderRegular
          sourceList="local,dropbox"
          classNameUploader="uc-light"
          pubkey="199309df618afcb2704e"
        />
    </div>
  );
}

export default Getstarted;