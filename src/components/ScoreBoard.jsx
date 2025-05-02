export default function ScoreBoard({ data }) {
  return (
    <div className="scoreboard flex flex-col">
      <div className="title">
        Uzay <br /> Savaşçısı
      </div>
      <div className="flex justify-between space-x-10 ">
        <div className="timer">
          <div className="display-value">{data.timeLeft}</div>
          <div>Zaman</div>
        </div>

        <div className="score">
          <div className="display-value">{data.score}</div>
          <div>Skor</div>
        </div>
      </div>
    </div>
  );
}
