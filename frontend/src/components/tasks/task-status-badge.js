import { Badge } from "@/components/ui/badge";

export default function TaskStatusBadge({ status }) {
  const handleSwitch = (status) => {
    switch (status) {
      case "pending":
        return `bg-gray-400`;
      case "in_progress":
        return `bg-yellow-500`;

      case "completed":
        return `bg-green-500`;
      case "assigned":
        return `bg-purple-500`;
    }
  };

  return <Badge className={`${handleSwitch(status)}`}>{status}</Badge>;
}
