import { Card, CardContent } from "./ui/card";

export default function CardSection({ icon, title, description }) {
  return (
    <Card className="border-dashed border-2 border-gray-300 h-fit">
      <CardContent className="flex flex-col items-center justify-center py-16">
        {icon}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-center max-w-md">{description}</p>
      </CardContent>
    </Card>
  );
}
