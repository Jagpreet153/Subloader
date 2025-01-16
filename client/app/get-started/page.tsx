'use client' 
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';

function Getstarted() {
  return (
        <div className='flex justify-center items-center h-screen'>
        <FileUploaderRegular
          sourceList="local,dropbox"
          classNameUploader="uc-light"
          pubkey={process?.env?.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ''}
        />
    </div>
  );
}

export default Getstarted;