import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LayoutAuth from "@/Layouts/LayoutAuth";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Head, useForm } from "@inertiajs/react";
import { LogIn } from "lucide-react";

export default function Login({ className, ...props }) {
    //destruct useForm
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    //function "loginHandler"
    const loginHandler = async (e) => {
        e.preventDefault();

        //fetch to login
        post("/login");
    };

    return (
        <>
            <Head title="Login" />
            <LayoutAuth>
                <div
                    className={cn("flex flex-col gap-6", className)}
                    {...props}
                >
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">
                                Selamat Datang
                            </CardTitle>
                            <CardDescription>
                                Masuk ke akun Anda untuk mengakses Aplikasi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={loginHandler}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            type="email"
                                            placeholder="contoh@gmail.com"
                                            value={data.email}
                                            className={
                                                errors.email
                                                    ? "border-red-500 focus-visible:ring-red-500"
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        {errors.email && (
                                            <FieldDescription className="text-red-500">
                                                {errors.email}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                    <Field>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">
                                                Password
                                            </FieldLabel>
                                            {/* <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Lupa password?
                                            </a> */}
                                        </div>
                                        <Input
                                            type="password"
                                            placeholder="Masukkan password"
                                            value={data.password}
                                            className={
                                                errors.password
                                                    ? "border-red-500 focus-visible:ring-red-500"
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.password && (
                                            <FieldDescription className="text-red-500">
                                                {errors.password}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                    <Field>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <span className="flex items-center justify-center">
                                                    <svg
                                                        className="w-5 h-5 mr-3 animate-spin"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Memproses...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center">
                                                    <LogIn className="w-5 h-5 mr-2" />
                                                    Masuk
                                                </span>
                                            )}
                                        </Button>
                                        <FieldDescription className="text-center">
                                            {new Date().getFullYear()} &copy;
                                            Dilindungi Undang-Undang.
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </LayoutAuth>
        </>
    );
}
