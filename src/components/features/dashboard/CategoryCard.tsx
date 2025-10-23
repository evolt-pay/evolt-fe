"use client";

import { Card } from "@evolt/components/ui/card";

interface CategoryCardProps {
  title: string;
  image: string;
  colorClass: string;
}

const CategoryCard = ({ title, image, colorClass }: CategoryCardProps) => {
  return (
    <Card
      className={`${colorClass} overflow-hidden border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group w-full h-[220px]  `}
    >
      {/* Title */}
      {/* <h3 className="text-lg font-semibold text-foreground">{title}</h3> */}

      {/* Image */}
      <div className=" h-full ">
        {/* <div className="w-full rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div> */}
      </div>
    </Card>
  );
};

export default CategoryCard;
