"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  courseName: z.string().min(1, {
    message: "Course name is required",
  }),
  teacherName: z.string().min(1, {
    message: "Teacher name is required",
  }),
  educationalQualification: z.string().min(1, {
    message: "Educational qualification is required",
  }),
  experience: z.string().optional(),
  fieldOfExpertise: z.string().min(1, {
    message: "Field of expertise is required",
  }),
  cirtification: z.string().optional(),
});
const RequestForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/teacher/request", values);
      toast.success("Request submitted!");
      router.push("/");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="p-10">
      <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          <h3 className="text-lg">Request to be teacher</h3>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="teacherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="teacherName">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'John Doe'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="courseName">Course Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What would you like to name your course? Don&apos;t worry,
                    you can change this later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationalQualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="educationalQualification">
                    Educational Qualification
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'BSc in Computer Science'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What is your highest educational qualification?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="experience">Experience</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. '5 years of experience'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How many years of experience do you have?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fieldOfExpertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="fieldOfExpertise">
                    Field of Expertise
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What is your field of expertise?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cirtification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="cirtification">Citification</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Microsoft Certified Professional'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Do you have any certification in your field of expertise?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RequestForm;
