import React from "react";
import {
  FaWifi,
  FaTv,
  FaBuilding,
  FaSnowflake,
  FaShower,
  FaLaptop,
  FaMoon,
  FaTshirt,
  FaRegSnowflake,
  FaUtensils,
  FaBreadSlice,
  FaDoorOpen,
  FaParking,
  FaKey,
  FaHeart,
  FaUsers,
  FaIdCard,
  FaBed,
  FaBath,
  FaDumbbell,
  FaGamepad,
  FaConciergeBell,
  FaSwimmingPool,
} from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";

export const iconMapping: {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
} = {
  FaWifi,
  FaTv,
  FaBuilding,
  FaSnowflake,
  FaShower,
  FaLaptop,
  FaMoon,
  FaTshirt,
  FaRegSnowflake,
  FaUtensils,
  FaBreadSlice,
  FaDoorOpen,
  FaParking,
  FaKey,
  FaHeart,
  FaUsers,
  FaIdCard,
  FaBed,
  FaBath,
  FaDumbbell,
  FaGamepad,
  FaConciergeBell,
  FaSwimmingPool,
  FaKitchenSet,
};

export function getIconComponent(
  iconName: string
): React.ComponentType<React.SVGProps<SVGSVGElement>> | null {
  return iconMapping[iconName] || null;
}
