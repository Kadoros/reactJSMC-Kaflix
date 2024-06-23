import { useForm } from "react-hook-form";

function ToDoList() {
  const { register } = useForm();
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <input {...register("todo")} placeholder="write a to do" />
        <input {...register("qwe")} placeholder="qwe" />
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;
