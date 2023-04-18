import React, { useState, useCallback, useRef, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, Tooltip, Legend } from "recharts";
import "./BarGraph.css";
import Modal from "./Modal"; // Import the Modal component


export default function BarGraph({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carrotDirection, setCarrotDirection] = useState("right");
  const [showRightCarrot, setShowRightCarrot] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeItem = data[activeIndex];
  const chartContainerRef = useRef(null);

  const handleClick = useCallback((entry, index) => {
    setActiveIndex(index);
    setIsModalOpen(true); // Open the modal
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  const checkCarrotDirection = () => {
    if (!chartContainerRef.current) {
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = chartContainerRef.current;
    setShowRightCarrot(scrollLeft + clientWidth < scrollWidth);
  };

  const handleCarrotClick = () => {
    if (chartContainerRef.current) {
      const scrollAmount = carrotDirection === "right" ? 200 : -200;
      chartContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleWheel = (e) => {
    if (chartContainerRef.current) {
      e.preventDefault();
      chartContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (chartContainer) {
      chartContainer.addEventListener("wheel", handleWheel);
      chartContainer.addEventListener("scroll", checkCarrotDirection);
    }
    return () => {
      if (chartContainer) {
        chartContainer.removeEventListener("wheel", handleWheel);
        chartContainer.removeEventListener("scroll", checkCarrotDirection);
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={chartContainerRef}
        style={{
          width: "900px",
          overflowX: "hidden",
          overflowY: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        
      >

        <BarChart width={data.length * 100} height={400} data={data}>
          <Bar dataKey="uv" onClick={handleClick}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#fffff" : "#b52828"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
      
          <XAxis dataKey="name" />
        </BarChart>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} activeItem={activeItem} data={activeItem.uv} />
      {carrotDirection === "right" && showRightCarrot && (
        <div
          className="carrot"
          onClick={handleCarrotClick}
          style={{ cursor: "pointer" }}
        >
          &#x25B6;
        </div>
      )}
    </div>
  );
}
