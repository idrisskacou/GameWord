export class Launches {
    id: number | undefined;// internal MongoDB primary key
    upcoming_launch_image: string = ''
    upcoming_launch_title: string = ''
    upcoming_launch_date: Date = new Date("2015-03-25")
    upcoming_launch_time: string = ''
    upcoming_launch_base: string = ''
    upcoming_launch_location: string = ''
    upcoming_launch_rocket: string = ''
    upcoming_launch_description: string = ''
    upcoming_launch_company: string = ''
    url: string = ''
    upcoming_launch_details?: string; // This is for extra details
    isExpanded?: boolean; // This will track if the details are shown
}
