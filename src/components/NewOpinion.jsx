import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { use } from "react";
import Submit from "./Submit";
export function NewOpinion() {
const {addOpinion }=use(OpinionsContext)

 async  function handleSubmit(prevData, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    const error = [];
    if (userName.trim().length === 0) {
      error.push("Enter the userName");
    }
    if (title.trim().length === 0) {
      error.push("Enter the title");
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      error.push("the opinion mus be between 10 to 300 characters long.");
    }

    if (error.length > 0) {
      return {
        error,
        enteredValue: {
          userName,
          title,
          body,
        },
      };
    }
    await addOpinion({title,userName,body})
    return { error: null };
  }
  const [formState, formAction] = useActionState(handleSubmit, { error: null });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValue?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValue?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValue?.body}
          ></textarea>
        </p>
        {formState.error && (
          <ul className="errors">
            {formState.error.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
<Submit/>
      
      </form>
    </div>
  );
}
