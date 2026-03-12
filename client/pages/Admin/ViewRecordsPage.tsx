import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ViewRecordsTable } from "@/components/ViewRecords/ViewRecordsTable";
import { fetchTrainers } from "@/lib/utils/Trainer/TrainerUtils";
import { Dropdown } from "@/components/Dropdown";
import { Trainer } from "@/types/TrainerType";

export default function ViewRecordsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);

    useEffect(() => {
        fetchTrainers().then((data) => {
        const active = data.filter(
            (t) => t.availability !== "Pending" && t.availability !== null
        ); 
        setTrainers(active);
        if (id) {
            const found = active.find((t) => t.id === Number(id));
            setTrainer(found ?? active[0]);
        } else {
            setTrainer(active[0]);
        }
        });
    }, [id]);

  function handleTrainerChange(fullName: string) {
    const found = trainers.find(
      (t) => `${t.firstName} ${t.lastName}` === fullName
    );
    if (found) {
      setTrainer(found);
    }
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-bni-red">View Record</h1>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Dropdown
          label="Trainer Name"
          value={trainer ? `${trainer.firstName} ${trainer.lastName}` : ""}
          options={trainers.map((t) => `${t.firstName} ${t.lastName}`)}
          onChange={handleTrainerChange}
          className="border border-gray-300 rounded-lg px-3 py-2 min-w-[200px] bg-gray-50 text-sm"
          labelClassName="text-bni-black"
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm text-bni-black font-semibold">Trainer ID</label>
          <div className="border border-gray-300 rounded-lg px-3 py-2 min-w-[100px] bg-gray-50">
            <span className="text-sm text-gray-700">{trainer?.trainerId ?? "..."}</span>
          </div>
        </div>
      </div>

      {trainer && <ViewRecordsTable trainerId={trainer.id} />}
    </div>
  );
}