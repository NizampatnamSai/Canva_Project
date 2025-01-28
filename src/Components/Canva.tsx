import {
  Circle,
  Image as KonvaImage,
  Layer,
  Line,
  Rect,
  Stage,
  Arrow,
  Transformer,
} from "react-konva";
import Header from "./Header";
import { useCallback, useId, useRef, useState } from "react";

function Canva() {
  const stageRef = useRef(null);
  const [circles, setCircles] = useState([]);
  const [rectangle, setRectangle] = useState([]);
  const [arrow, setArrow] = useState([]);
  const [line, setLine] = useState([]);
  const [currentShape, setCurrentShape] = useState("");
  const [image, setImage] = useState(null);
  const handleClick = (title) => {
    console.log(title);
    setCurrentShape(title);
  };
  const id = useId();
  const curentShapeRef = useRef("");
  const handleStageClick = () => {
    // console.log("stageclicked", stageRef.current.getPointerPosition());
    // const { x: xPosition, y: yPosition } =
    //   stageRef.current.getPointerPosition();
    // if (currentShape === "Arrow") {
    //   setArrow([...arrow, { x: xPosition, y: yPosition }]);
    // } else if (currentShape === "Rectangle") {
    //   setRectangle([...rectangle, { x: xPosition, y: yPosition }]);
    // } else if (currentShape === "Circle") {
    //   setCircles([...circles, { x: xPosition, y: yPosition }]);
    // } else if (currentShape === "line") {
    //   setLine([...line, { x: xPosition, y: yPosition }]);
    // }
  };
  const hanldeImageUpload = useCallback((e) => {
    if (e?.target?.files?.[0]) {
      const imgUrl = URL.createObjectURL(e?.target?.files?.[0]);
      const image = new Image(250, 250);
      image.src = imgUrl;
      setImage(image);
    }
  }, []);
  const handleExport = () => {
    const dataURL = stageRef.current.toDataURL();
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "canvas-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleClear = () => {
    setArrow([]);
    setRectangle([]);
    setCircles([]);
    setLine([]);
  };
  const isMoveRef = useRef(false);
  //   const handleStageMousein = () => {
  //     const { x: xPosition, y: yPosition } =
  //       stageRef.current.getPointerPosition();
  //     if (currentShape === "Arrow") {
  //       setArrow([
  //         ...arrow,
  //         { id: id, points: [xPosition, yPosition, xPosition, yPosition] },
  //       ]);
  //     } else if (currentShape === "Rectangle") {
  //       setRectangle([...rectangle, { x: xPosition, y: yPosition }]);
  //     } else if (currentShape === "Circle") {
  //       setCircles([...circles, { x: xPosition, y: yPosition }]);
  //     } else if (currentShape === "line") {
  //       setLine([...line, { x: xPosition, y: yPosition }]);
  //     }
  //   };
  //   const handleMouseMove = () => {
  //     const { x: xPosition, y: yPosition } =
  //       stageRef.current.getPointerPosition();
  //     if (currentShape === "Arrow") {
  //       setArrow([
  //         ...arrow,
  //         { id: id, points: [xPosition, yPosition, xPosition, yPosition] },
  //       ]);
  //     } else if (currentShape === "Rectangle") {
  //       setRectangle([...rectangle, { x: xPosition, y: yPosition }]);
  //     } else if (currentShape === "Circle") {
  //       setCircles([...circles, { x: xPosition, y: yPosition }]);
  //     } else if (currentShape === "line") {
  //       setLine([...line, { x: xPosition, y: yPosition }]);
  //     }
  //   };

  const handleMouseOut = () => {
    isMoveRef.current = false;
  };
  const handleStageMousein = () => {
    isMoveRef.current = true;

    const { x: xPosition, y: yPosition } =
      stageRef.current.getPointerPosition();
    curentShapeRef.current = id;
    if (currentShape === "Arrow") {
      setArrow((prev) => [
        ...prev,
        {
          id: id,
          points: [xPosition, yPosition, xPosition, yPosition],
        },
      ]);
    } else if (currentShape === "Rectangle") {
      setRectangle([
        ...rectangle,
        { id: id, x: xPosition, y: yPosition, height: 10, width: 10 },
      ]);
    } else if (currentShape === "Circle") {
      setCircles([
        ...circles,
        { id: id, x: xPosition, y: yPosition, radius: 1 },
      ]);
    } else if (currentShape === "line") {
      setLine([...line, { id: id, points: [xPosition, yPosition] }]);
    }
  };
  const handleMouseMove = () => {
    if (!isMoveRef.current) return;
    const { x: xPosition, y: yPosition } =
      stageRef.current.getPointerPosition();
    if (currentShape === "Arrow") {
      let newArray = arrow.map((item) => {
        if (item.id === curentShapeRef.current) {
          return {
            ...item,
            points: [item?.points[0], item?.points[1], xPosition, yPosition],
          };
        } else {
          return item;
        }
      });
      setArrow(newArray);
    } else if (currentShape === "Rectangle") {
      //   setRectangle((prev) => ({
      //     ...prev,
      //     height: yPosition - prev.y,
      //     width: xPosition - prev.x,
      //   }));
      setRectangle((prev) =>
        prev.map((item) =>
          item.id === curentShapeRef.current
            ? { ...item, height: yPosition - item.y, width: xPosition - item.x }
            : item
        )
      );
    } else if (currentShape === "Circle") {
      //   setCircles((prev) => ({
      //     ...prev,
      //     radius: ((xPosition - prev.x) ** 2 + (yPosition - prev.y) ** 2) ** 0.5,
      //   }));
      setCircles((prev) =>
        prev.map((item) =>
          item.id === curentShapeRef.current
            ? {
                ...item,
                radius:
                  ((xPosition - prev.x) ** 2 + (yPosition - prev.y) ** 2) **
                  0.5,
              }
            : item
        )
      );
    } else if (currentShape === "line") {
      //   setLine((prev) => ({
      //     ...prev,
      //     points: [...prev.points, xPosition, yPosition],
      //   }));
      setLine((prev) =>
        prev.map((item) =>
          item?.id === curentShapeRef.current
            ? { ...item, points: [...item.points, xPosition, yPosition] }
            : item
        )
      );
    }
  };

  const transferRef = useRef(null);
  const handleShapeClick = (e) => {
    const currentTarget = e.currentTarget;
    transferRef.current.node(currentTarget);
    console.log(e.currentTarget);
  };
  return (
    <>
      <Header
        currentShape={currentShape}
        handleClick={handleClick}
        hanldeImageUpload={hanldeImageUpload}
        handleExport={handleExport}
        handleClear={handleClear}
      />
      <Stage
        ref={stageRef}
        onClick={handleStageClick}
        onTap={handleStageClick}
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundColor="white"
        onMouseDown={handleStageMousein}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseOut}
      >
        <Layer>
          <Rect width={500} height={500} fill="white" />

          {image && (
            <KonvaImage image={image} x={0} y={0} height={120} width={120} />
          )}
          {/* {rectangle.map((rect, index) => (
            <Rect width={rect.x} height={rect.y} fill="red" />
          ))}
          {circles.map((circle, index) => (
            <Circle x={circle.x} y={circle.y} stroke="black" radius={50} />
          ))}
          {arrow.map((arrow, index) => (
            <Arrow stroke="black" points={arrow?.points} />
          ))}
          {line.map((line, index) => (
            <Line
              x={line.x}
              y={line.y}
              points={[0, 0, 100, 0, 100, 100]}
              tension={0.5}
              closed
              stroke="black"
              fillLinearGradientStartPoint={{ x: -50, y: -50 }}
              fillLinearGradientEndPoint={{ x: 50, y: 50 }}
              fillLinearGradientColorStops={[0, "red", 1, "green"]}
            />
          ))} */}

          {rectangle?.map((item) => {
            return (
              <Rect
                x={item.x}
                x={item.y}
                height={item.height}
                width={item.width}
                fill="red"
                id={item.id}
                onClick={handleShapeClick}
                draggable
              />
            );
          })}
          {circles.map((item) => {
            return (
              <Circle
                x={item.x}
                y={item.y}
                stroke="black"
                radius={item.radius}
                id={item.id}
                onClick={handleShapeClick}
              />
            );
          })}
          {arrow?.map((item) => (
            <Arrow
              stroke="black"
              id={item.id}
              points={item?.points}
              onClick={handleShapeClick}
            />
          ))}
          {line.map((item) => (
            <Line
              points={item.points}
              //   points={[0, 0, 100, 0, 100, 100]}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              closed
              stroke="black"
              id={item.id}
              fillLinearGradientStartPoint={{ x: -50, y: -50 }}
              fillLinearGradientEndPoint={{ x: 50, y: 50 }}
              fillLinearGradientColorStops={[0, "red", 1, "green"]}
              onClick={handleShapeClick}
            />
          ))}
          <Transformer ref={transferRef} />
        </Layer>
      </Stage>
    </>
  );
}

export default Canva;
