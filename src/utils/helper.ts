import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const checkSessionAndRedirectIfInvalid = async (pathName: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${pathName}`);
    // redirect("/login?callbackUrl=/test");
  }
};

export function capitalizeFirstLetters(name: string) {
  // Split the string into individual words
  var words = name.split(" ");

  // Capitalize the first letter of each word
  var capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words back into a string
  var capitalizedString = capitalizedWords.join(" ");

  // Return the modified string
  return capitalizedString;
}
