export interface LaunchData {
    id: number, // internal MongoDB primary key
    upcoming_launch_image: string,
    upcoming_launch_title: string,
    upcoming_launch_date: Date,
    upcoming_launch_time: string,
    upcoming_launch_base: string,
    upcoming_launch_location: string,
    upcoming_launch_rocket: string,
    upcoming_launch_description: string,
    upcoming_launch_company: string,
    url: string
}