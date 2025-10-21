
'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useContent } from "@/hooks/use-content";
import { Users, Calendar, Briefcase, Shield, FileText, Mail } from "lucide-react";
import Link from "next/link";


export default function AdminDashboard() {
    const { content, isLoading } = useContent();

    if (isLoading) return <div>Loading dashboard data...</div>;

    const stats = [
        { name: 'Teams', value: content.teams.length, icon: Users, href: '/admin/teams' },
        { name: 'Upcoming Events', value: content.upcomingEvents.length, icon: Calendar, href: '/admin/events' },
        { name: 'CSL Classes', value: content.cslClasses.length, icon: Briefcase, href: '/admin/csl-classes' },
        { name: 'Resources', value: content.resources.length, icon: Shield, href: '/admin/resources' },
    ];
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to the CyberHive content management dashboard. Here you can edit various parts of the website.</p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map(stat => (
                    <Link key={stat.name} href={stat.href}>
                         <Card className="hover:bg-muted transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                                <stat.icon className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <Link href="/admin/home" className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                        <FileText className="h-8 w-8 text-primary" />
                        <span className="text-sm font-medium">Home Page</span>
                    </Link>
                    <Link href="/admin/about" className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                        <Users className="h-8 w-8 text-primary" />
                        <span className="text-sm font-medium">About Page</span>
                    </Link>
                     <Link href="/admin/teams" className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                        <Users className="h-8 w-8 text-primary" />
                        <span className="text-sm font-medium">Manage Teams</span>
                    </Link>
                     <Link href="/admin/contact" className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                        <Mail className="h-8 w-8 text-primary" />
                        <span className="text-sm font-medium">Contact Page</span>
                    </Link>
                     <Link href="/admin/events" className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                        <Calendar className="h-8 w-8 text-primary" />
                        <span className="text-sm font-medium">Events</span>
                    </Link>
                    <Link href="/admin/csl-classes" className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors">
                        <Briefcase className="h-8 w-8 text-primary" />
                        <span className="text-sm font-medium">CSL Classes</span>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
