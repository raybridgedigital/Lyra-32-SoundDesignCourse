import { createFileRoute } from "@tanstack/react-router";
import { LessonPage } from "@/components/lesson";

export const Route = createFileRoute("/c/$id")({
  component: CourseRoute,
});

function CourseRoute() {
  const { id } = Route.useParams();
  return <LessonPage id={id} />;
}
