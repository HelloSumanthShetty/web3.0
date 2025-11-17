  import { useEffect, useState } from "react";
  // import { DotLottie } from "@lottiefiles/dotlottie-web";

  // const APIKEY = import.meta.env.VITE_GIPHY_API;

  // const canvas = document.querySelector("#dotlottie-canvas") as HTMLCanvasElement | null;


  // if (!canvas) {
  //   throw new Error("Canvas element not found!");
  // }
  // const dotLottie = new DotLottie({
  //   autoplay: true,
  //   loop: true,
  //   canvas,
  //   src: "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie",
  // });

  const useFetch = ({ keyword }: { keyword: string }) => {
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs = async () => {
      try {
        // const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
        // const { data } = await response.json();

        // setGifUrl(data[0]?.images?.downsized_medium.url);
      } catch (error) {
        setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
      }
    };

    useEffect(() => {
      if (keyword) fetchGifs();
    }, [keyword]);

    return gifUrl;
  };

  export default useFetch;
