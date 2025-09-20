import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  gradient: string;
  className?: string;
}

export function RoleCard({ title, description, icon, onClick, gradient, className }: RoleCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow",
        "border-border/50 backdrop-blur-sm overflow-hidden group",
        className
      )}
      onClick={onClick}
    >
      <div className={cn("h-2", gradient)} />
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-all duration-300">
          <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}