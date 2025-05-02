export default function ScoreBoard({ data }) {
  return (
    <div className="scoreboard flex text-sm md:text-2xl">
      <div className="timer text-sm md:text-2xl">
        <div className="display-value">{data.timeLeft}</div>
        <div>Zaman</div>
      </div>
      <div className="title text-sm md:text-2xl">
        Uzay <br /> Savaşçısı
      </div>

      <div className="score text-sm md:text-2xl">
        <div className="display-value">{data.score}</div>
        <div>Skor</div>
      </div>
    </div>
  );
}
