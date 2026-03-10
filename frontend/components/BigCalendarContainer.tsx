import { fetchListData } from "@/frontend/lib/serverApi";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/frontend/lib/schedule";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const { data: dataRes } = await fetchListData<any>({
    model: "lesson",
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
    page: 1,
    perPage: 100,
  });

  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;