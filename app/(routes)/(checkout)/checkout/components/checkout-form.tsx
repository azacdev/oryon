"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import useCart from "@/hooks/use-cart";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { PaystackButton } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

type referenceObj = {
  message: string;
  reference: string;
  status: "sucess" | "failure";
  trans: string;
  transaction: string;
  trxref: string;
};

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(30),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().min(1, "Phone number is required").max(15),
  state: z.string().min(0, "State is required").max(50),
});

const CheckoutForm = () => {
  const [ref, setRef] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    setSuccess(false);
    setRef("" + Math.floor(Math.random() * 1000000000 + 1));
  }, [success]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      state: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          values: values,
        }
      );
      window.location.href = data.data.authorization_url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full w-full flex-1 bg-white pb-12 pt-10 lg:flex-initial lg:pl-12 lg:pt-16 px-8 mx-auto max-w-xl"
      >
        <div className="space-y-2 flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First and lastname"
                    className="w-full outline-none border-b border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    className="w-full outline-none border-b border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone (Eg. +2348137926904)"
                    className="w-full outline-none border-b border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Kano">Kano</SelectItem>
                    <SelectItem value="Kaduna">Kaduna</SelectItem>
                    <SelectItem value="Abuja">Abuja</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Proceed with payment
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
