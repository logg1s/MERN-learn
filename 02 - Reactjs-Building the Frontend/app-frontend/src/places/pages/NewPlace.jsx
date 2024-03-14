import Input from "../../shared/components/FormElements/Input";
import './NewPlace.css'
function NewPlace() {
  return (
    <form className="place-form">
      <Input element="input" type="text" label="Title" />
    </form>
  );
}

export default NewPlace;
