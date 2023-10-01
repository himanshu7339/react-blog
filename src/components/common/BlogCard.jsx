import { Link } from "react-router-dom";
import {capitalizeFLetter} from "../../utils/workFunction"
import { monthNames } from "../../assets/data/monthNames";

const BlogCard = ({ props }) => {
  // that for content
  const contentWord = props.content.split(/\s+/);
  const shortContent = contentWord.slice(0, 20).join(" ");
  const textOnly = shortContent.replace(/<[^>]+>/g, "");

  // that for title
  const titleWord = props.title.split(/\s+/);
  const shortTitle = titleWord.slice(0, 8).join(" ");

  const date = new Date(props.createdAt);
  const monthIndex = date.getMonth();
  // Get the month name based on the month index
  const monthName = monthNames[monthIndex];
  
  
  return (
    // <!-- component -->
    <Link to={`/blog/${props._id}`}>
      <div class="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
        <img
          src={props.image}
          class="aspect-video w-full object-cover"
          alt=""
        />
        <div class="p-4">
          <div className="flex gap-4">

         
          <p class="mb-1 text-sm text-primary-500">
            Himanshu
          </p>
          <time><p className="text-start text-sm lg:mb-3 ">
            {`${date.getDate()} ${monthName} ${date.getFullYear()}`}{" "}
            <span style={{ marginLeft: "10px" }}>{props.readingTime} Min Read</span>
          </p></time>
          </div>
          <h3 class="text-xl font-medium text-gray-900">{`${capitalizeFLetter(shortTitle)}...`}</h3>
          <p class="mt-1 text-gray-500">{`${capitalizeFLetter(textOnly)}...`}</p>
          <div class="mt-4 flex gap-2">
            <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
              {`${capitalizeFLetter(props.category.name)}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
