
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BookOpen, Calendar, Home, Shield, Users, Footprints, Mail } from "lucide-react";
import Link from "next/link";

const dashboardItems = [
    { title: "Home Page", href: "/admin/dashboard/home", icon: <Home className="h-6 w-6" />, description: "Edit content for the main landing page." },
    { title: "About Page", href: "/admin/dashboard/about", icon: <Users className="h-6 w-6" />, description: "Manage the About Us page content." },
    { title: "Team", href: "/admin/dashboard/team", icon: <Users className="h-6 w-6" />, description: "Manage the team members." },
    { title: "CSL Classes", href: "/admin/dashboard/csl", icon: <BookOpen className="h-6 w-6" />, description: "Manage all Cyber Siksha Lab classes." },
    { title: "Events", href: "/admin/dashboard/events", icon: <Calendar className="h-6 w-6" />, description: "Create and manage upcoming and past events." },
    { title: "Resources", href: "/admin/dashboard/resources", icon: <Shield className="h-6 w-6" />, description: "Curate and manage helpful resources." },
    { title: "Contact Page", href: "/admin/dashboard/contact", icon: <Mail className="h-6 w-6" />, description: "Manage the content on the contact page." },
    { title: "Footer", href: "/admin/dashboard/footer", icon: <Footprints className="h-6 w-6" />, description: "Manage footer links and content." },
];

export default function AdminDashboardPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-headline font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to the CyberHive Content Management System.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardItems.map((item) => (
                    <Link href={item.href} key={item.title}>
                        <Card className="hover:border-primary hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    {item.icon}
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-headline">{item.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
