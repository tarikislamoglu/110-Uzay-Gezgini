import { useState, useEffect } from "react";
import getSpaceShips from "../utilities/getSpaceShips";
import shootShip from "../utilities/shootShip";
export default function PlayArea({ playProps }) {
  const {
    timeLeft,
    gameStarted,
    setScore,
    timerRunning,
    playLaser,
    playExplosion,
    difficulty,
    score,
  } = playProps;
  const [currentShips, setCurrentShips] = useState([]);

  useEffect(() => {
    if (timeLeft % 6 === 0 && timeLeft !== 0 && gameStarted && timerRunning) {
      setCurrentShips(() => getSpaceShips(difficulty));
    }
  }, [timeLeft, gameStarted, timerRunning]);

  const shipElements = currentShips.map((ship) => (
    <div
      className={`ship ${ship.isShot ? "disappear" : ""} flyDown`}
      style={{ gridArea: ship.position }}
      onClick={
        ship.isShot
          ? null
          : () =>
              shootShip(
                ship.id,
                ship.points,
                setCurrentShips,
                setScore,
                playExplosion
              )
      }
      key={ship.id}
    >
      {ship.isShot ? "💥" : <span className={ship.type}>{ship.icon}</span>}
    </div>
  ));

  return (
    <div
      onMouseDown={(e) => {
        playLaser();

        if (!e.target.closest(".ship")) {
          if (score >= 5) {
            setScore((prev) => prev - 5);
          }
        }
      }}
      className="play-area-container w-full"
    >
      {shipElements}
    </div>
  );
}
