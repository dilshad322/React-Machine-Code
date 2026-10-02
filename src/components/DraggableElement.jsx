import { useEffect, useRef, useState } from "react";

function DraggableElement() {
  const [position, setPosition] = useState({
      x: 100,
      y: 100,
    });
  
    const [isDragging, setIsDragging] = useState(false);
  
    const boxRef = useRef(null);
  
    // Box ko grab karte waqt
    const handleMouseDown = (e) => {
      const rect = boxRef.current.getBoundingClientRect();
      setIsDragging(true);
  
      // Mouse aur box ke top-left ke beech ka distance
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
  
      // In values ko ref mein store karna better hai
      boxRef.current.offsetX = offsetX;
      boxRef.current.offsetY = offsetY;
    };
  
    useEffect(() => {
      const handleMouseMove = (e) => {
        if (!isDragging) return;
  
        const offsetX = boxRef.current.offsetX;
        const offsetY = boxRef.current.offsetY;
  
        setPosition({
          x: e.clientX - offsetX,
          y: e.clientY - offsetY,
        });
      };
  
      const handleMouseUp = () => {
        setIsDragging(false);
      };
  
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging]);
  
    return (
      <div>
        <div
          ref={boxRef}
          onMouseDown={handleMouseDown}
          style={{
            width: "300px",
            height: "200px",
            background: "red",
            position: "fixed",
            left: position.x,
            top: position.y,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          Box
        </div>
  
        <h2>X:(rect.left) {position.x}</h2>
        <h2>Y:(rect.top) {position.y}</h2>
      </div>
    );
  }


export default DraggableElement