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
      className={`${colorClass} overflow-hidden border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group w-full`}
    >
      <div className="p-4 pb-2">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      </div>
      <div className="px-4 pb-4">
        <div className="aspect-[4/3] rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
