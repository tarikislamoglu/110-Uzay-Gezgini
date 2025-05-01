import { useEffect, useState } from "react";
import useSound from "use-sound";
import PlayArea from "./components/PlayArea";
import ScoreBoard from "./components/ScoreBoard";
import "./styles.css";
import { AiOutlineSound } from "react-icons/ai";
import { IoVolumeMuteOutline } from "react-icons/io5";
export default function App() {
  const STARTING_SCORE = 0;

  const [gameTime, setGameTime] = useState(60);
  const [difficulty, setDifficulty] = useState("easy");

  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameTime);
  const [score, setScore] = useState(STARTING_SCORE);

  const [musicSound, setMusicSound] = useState(50);
  const [gameSound, setGameSound] = useState(50);

  const [playSong] = useSound("../audio/song.mp3", {
    volume: musicSound / 100,
  });
  const [playClick] = useSound("../audio/click.mp3", {
    volume: gameSound / 100,
  });
  const [playExplosion] = useSound("../audio/explosion.mp3", {
    volume: gameSound / 100,
  });
  const [playLaser] = useSound("../audio/laser.mp3", {
    volume: gameSound / 100,
  });

  const [startClickCount, setStartClickCount] = useState(0);
  const [startCount, setStartCount] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    let clearIntervalCount;
    if (timerRunning && startCount > 0) {
      clearIntervalCount = setInterval(() => {
        setStartCount((prev) => {
          if (prev <= 1) {
            clearInterval(clearIntervalCount);
            setGameStarted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(clearIntervalCount);
  }, [timerRunning]);

  useEffect(() => {
    let intervalId;
    if (gameStarted) {
      playClick();
      playSong();

      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [gameStarted]);

  return (
    <div>
      <ScoreBoard data={{ score, timeLeft }} />
      <PlayArea
        playProps={{
          timeLeft,
          setScore,
          gameStarted,
          timerRunning,
          playLaser,
          playExplosion,
          difficulty,
        }}
      />
      {timerRunning && (
        <p className="text-3xl font-bold text-center my-4 text-white ">
          {startCount === 0 ? "Başla!" : startCount}
        </p>
      )}
      {!timerRunning && startClickCount > 0 && (
        <p className="text-blue-900 p-2 bg-blue-300 mx-auto text-center font-bold w-1/2 my-4 rounded-md">
          Oyun Bitti
        </p>
      )}

      <div className="bg-blue-200 p-4 my-4 rounded-md flex flex-col items-center space-y-5">
        <div className="flex space-x-5">
          <div className="flex flex-col items-center">
            <label htmlFor="">Music </label>
            <div className="flex">
              <span className="">
                {musicSound > 0 ? <AiOutlineSound /> : <IoVolumeMuteOutline />}
              </span>
              <input
                type="range"
                min={0}
                max={100}
                onChange={(e) => setMusicSound(e.target.value)}
                value={musicSound}
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="">Sound </label>
            <div className="flex">
              <span className="">
                {musicSound > 0 ? <AiOutlineSound /> : <IoVolumeMuteOutline />}
              </span>
              <input
                type="range"
                min={0}
                max={100}
                onChange={(e) => setGameSound(e.target.value)}
                value={gameSound}
              />
            </div>
          </div>
        </div>

        <div>
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <label>Game time:</label>
          <input
            type="number"
            max={300}
            min={30}
            onChange={(e) => setGameTime(e.target.value)}
            value={gameTime}
          />
          <label>Zorluk: </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Kolay</option>
            <option value="medium">Orta</option>
            <option value="hard">Zor</option>
          </select>
        </div>
      </div>

      <button
        className={`play-button ${timerRunning ? "fade-out" : "fade-in"}`}
        onClick={() => {
          setStartClickCount((prev) => prev + 1);
          setStartCount(3);
          setTimeLeft(gameTime);
          setScore(STARTING_SCORE);
          setTimerRunning(true);
          setGameStarted(false);
        }}
        disabled={timerRunning}
      >
        {!timerRunning && startClickCount > 0 ? "Tekrar oyna" : "Başlat"}
      </button>
    </div>
  );
}
/* Challenge 

       Uygulamanın temel oyun bileşenleri zaten yerinde, ancak başlat butonu ve zamanlayıcı tamamlanmamış durumda. Sizin göreviniz oyunu çalıştırmak için bunları ayarlamayı bitirmek

        1. Kullanıcı başlat butonuna tıkladığında. 
            - zamanlayıcı saniyeleri geri saymaya başlar.
            - başlat butonunun classList'inde "fade-in" class'ı "fade-out" ile değiştirilir.
            - başlat butonu devre dışı bırakılır. 
            - playSong() ve playClick() çağrılarak müzik ve tıklama sesi çalınır. 
        
        2. 0 saniyede zamanlayıcı durur ve başlat butonunun classList'inde "fade-out", "fade-in" ile değiştirilir. 
        
        3. Oyuncu daha sonra başlat butonuna tekrar tıklarsa, zamanlayıcı 60 saniyeye sıfırlanır ve skor 0'a sıfırlanır ve görev 1'de listelenen her şey tekrar gerçekleşir. 
        
        4. Bu görevleri yerine getirmek için *sadece* bu yorumların altına kod yazmanız gerekir; bunların üzerinde veya farklı bir dosyada herhangi bir şey değiştirmeniz veya eklemeniz gerekmez 
        
        Bonus olarak aşağıdakilerden birini veya daha fazlasını ekleyebilirsiniz:

    - Bir "oyun bitti" / "tekrar oyna" ekranı.
    - Oyun başlamadan önce bir geri sayım (3, 2, 1, başla!)

    - localStorage aracılığıyla en iyi skorları kaydedin ve görüntüleyin.

    - Kullanıcının adını girmesine izin verin.
    - Kullanıcı lazer atışı yapar ve hedefi vurmazsa puanları silin.
    - Kullanıcının müzik ve ses efektlerini kapatıp açmasına izin verin.
    - Kullanıcının oyunun ne kadar süreceğini özelleştirmesine izin verin.
    - Farklı zorluk seviyeleri oluşturun (daha fazla gemi ve/veya gemiler daha hızlı gider).

    - Oyunu oyuncu tarafından kontrol edilen bir uzay gemisi ile yukarıdan aşağıya, "ateş et" kaydırma aracı olarak yeniden yapın.

Diğer fikirler:
    - Temayı değiştirin.
    - Uygulamayı daha responsive hale getirin.
    - Mouse butonu basılı tutulduğunda lazerin görünmeye devam etmesini engelleyin.
*/
