"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { fi } from "date-fns/locale";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [{
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
},
{
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
}
]

const secondSection = [{
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",


}
]

export const DashboardSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2 " >
                    <Image src="/logo.svg" height={36} width={36} alt="logo" />
                    <p className="text-2xl font-semibold">MeetSense AI</p>
                </Link>
            </SidebarHeader>
            <div className="py-2 px-4">
                <Separator className="opacity-10 text-[#5D6B68]" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 hover:bg-linear-to-r/oklab border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 ",
                                    )}>
                                        <Link href={item.href}>
                                            <item.icon className="h-5 w-5 " />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>

                                        </Link>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="py-2 px-4">
                    <Separator className="opacity-10 text-[#5D6B68]" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 hover:bg-linear-to-r/oklab border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 ",
                                    )}>
                                        <Link href={item.href}>
                                            <item.icon className="h-5 w-5 " />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>

                                        </Link>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
};
