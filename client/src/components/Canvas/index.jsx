import React, { useRef, useEffect, useContext, useState } from 'react'
import { GameContext } from '../../Contexts/GameContext'
import backgroundCanvas from '../../assets/images/game-board.jpg'

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
}

export function Canvas(props) {
  const { stations, currentVehicle, socket, players, setPlayers } = useContext(GameContext)
  const [canvasImage, setCanvasImage] = useState()
  const canvasRef = useRef(null)

  function drawBusStation(ctx, x, y) {
    ctx.strokeStyle = 'red'
    ctx.lineWidth = '2'
    ctx.beginPath()
    ctx.arc((x - .15), (y - .15), 24, 0, 360)
    ctx.stroke()
  }

  function drawTaxiStation(ctx, x, y) {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = '3'
    ctx.beginPath()
    ctx.arc(x, y, 21, 0, 360)
    ctx.stroke()
  }

  function drawNumberStation(ctx, x, y, stationId, fillColor) {
    ctx.roundRect((x - 23), (y - 12.5), 46, 25, 5)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = '1.5'
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.stroke()
    ctx.font = '600 20px sans-serif'
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center'
    ctx.fillText(stationId, x, (y + 6.45))
  }

  function drawStation(ctx, station = {}, stationId) {
    const { x, y, subway, taxi, bus } = station
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(x, y, 19, 0, 360)
    ctx.fill()


    if (taxi) drawTaxiStation(ctx, x, y)

    if (bus) drawBusStation(ctx, x, y)

    const fillColorNumberStation = subway ? '#92d9ff' : '#FFFFFF'
    drawNumberStation(ctx, x, y, stationId, fillColorNumberStation)
  }
  function draw(ctx) {
    if (canvasImage) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.drawImage(canvasImage, 0, 0)
      for (let stationId in stations) {

      }
      stations.forEach((station, stationId) => {
        drawStation(ctx, station, stationId)
      })
      // Guia para o preenchimento manual das stations
      // ctx.beginPath()
      // ctx.arc(1372, 409, 21, 0, 360)
      // ctx.stroke()
    }
  }

  useEffect(() => {
    const image = new Image();
    image.src = backgroundCanvas
    image.onload = function () {
      setCanvasImage(image)
    }
  }, [])

  useEffect(() => {
    if (stations) {

    }

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    //Our draw came here
    function render() {
      frameCount++
      draw(context, frameCount)
    }
    render()

  }, [draw])

  function getMouseClick(event) {
    const canvas = event.target
    const size = canvas.getBoundingClientRect()
    const x = (event.clientX - size.left)
    const y = (event.clientY - size.top)
    console.log(x, y)
    return { x, y }
  }

  function checkAxisHitbox(click, axis, range) {
    return (click <= axis + range) && (click >= axis - range)
  }

  function getStationClicked(click) {
    let clickedStation
    for (let i = 0; i < stations.length; i++) {
      const { x, y } = stations[i]
      if (checkAxisHitbox(click.x, x, 17) && checkAxisHitbox(click.y, y, 17)) {
        clickedStation = { id: i, ...stations[i] }
        break
      }
    }

    return clickedStation
  }

  function handleClick(event) {
    const click = getMouseClick(event)
    const clickedStation = getStationClicked(click)
    const currentIndexPosition = players.find(({ id }) => id === socket.id).position
    const currentPosition = stations[currentIndexPosition]
    const availablesStations = currentPosition[`${currentVehicle}To`]
    console.log(availablesStations)
    console.log(currentVehicle, currentPosition)
    if (!availablesStations || !clickedStation) {
      return
    }
    if (availablesStations && availablesStations.includes(clickedStation.id)) {
      console.log(true)
    }
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <canvas onClick={handleClick} ref={canvasRef} {...props} width={1770} height={960} />
    </div>
  )
}
