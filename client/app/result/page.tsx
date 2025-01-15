
import Replicate from "replicate";
import { writeFile } from "node:fs/promises";


export default async function Result({videoRequest})
{
  const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
  });
  
  const input = {
    video_file_input: videoRequest.file_url,

    };
    try{
      const output = await replicate.run("fictions-ai/autocaption:18a45ff0d95feb4449d192bbdc06b4a6df168fa33def76dfc51b78ae224b599b", { input });
      for (const [index, item] of Object.entries(output)) {
        await writeFile(`output_${index}.mp4`, item);
      }    
    }

    catch (error) {
      console.error('Error processing video:', error);
      throw error;
    }
  
} 

//=> output_0.mp4, output_1.mp4 written to disk