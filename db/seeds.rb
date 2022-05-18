puts "📃 Seeding users..."

jeni = User.create!(username: "jenidang", email: "jenidang@gmail.com", password: "1234567jd")
francis = User.create!(username: "francisdang", email: "francisdang@gmail.com", password: "1234567fd")
racheal = User.create!(username: "racheal", email: "racheal2022@gmail.com", password: "1234567ra")
matteo = User.create!(username: "racheal", email: "matteo111@gmail.com", password: "1234567ma")


puts "📃 Seeding venues..."
v1 = Venue.create!(name: "Time Nightclub", address: "1875 Newport Blvd B245", city: "Costa Mesa", state: "CA", zip_code: "92627")
v2 = Venue.create!(name: "OC Fair & Event Center", address:"88 Fair Dr.", city: "Costa Mesa", state: "CA", zip_code: "92626")
# v3 = Venue.create!(name: "Corner Crossing", address: "9550 Bolsa Ave. Ste 115A", city: "Westminster", state: "CA", zip_code: "92683")
# v4 = Venue.create!(name: "ACE Beer Club", address: "9622 Garden Grove Blvd. Ste 102", city: "Garden Grove", state: "CA", zip_code: "92844")
# v5 = Venue.create!(name: "Bay Grill & Karaoke", address: "11951 Beach Blvd Ste J", city: "Stanton", state: "CA", zip_code: "90680")
v3 = Venue.create!(name: "Fountain Valley Skating Center", address: "9105 Recreation Cir", city: "Fountain Valley", state: "CA", zip_code: "92708")
v4 = Venue.create!(name: "Arrow Tag OC", address: "1815 E Wilshire Ave #909", city: "Santa Ana", state: "CA", zip_code: "92705")
v5 = Venue.create!(name: "Yoga on the Beach", address: "Tower 14", city: "Huntington Beach", state: "CA", zip_code: "92648")

puts "📃 Seeding events..."
e1 = Event.create!(name: "Kim Lee", image_url: "https://timenightclub.com/wp-content/uploads/2022/04/05-20-22_KIM_LEE_2_2160x1080_Eventbrite-1920x960.jpg", date: "Friday, May 20, 2022", start_time: "21:30", venue_id: v1.id, user_id: jeni.id)
e2 = Event.create!(name: "Wiz Khalifa", image_url: "https://timenightclub.com/wp-content/uploads/2022/03/05-21-22_WIZ_KHALIFA_1920x1080.png", date: "Saturday, May 21, 2022", start_time: "21:30", venue_id: v1.id, user_id: jeni.id)
e3 = Event.create!(name: "Benny Benassi", image_url: "https://timenightclub.com/wp-content/uploads/2022/03/05-28-22_Benny_Benassi_1920x1080.png", date: "Saturday, May 28, 2022", start_time: "21:30", venue_id: v1.id, user_id: jeni.id)
e4 = Event.create!(name: "Wuki", image_url: "https://timenightclub.com/wp-content/uploads/2022/04/06-03-22_WUKI_2160x1080_Eventbrite-1920x960.jpg", date: "Friday, June 3, 2022", start_time: "21:30", venue_id: v1.id, user_id: jeni.id)
e5 = Event.create!(name: "Dillion Francis", image_url: "https://timenightclub.com/wp-content/uploads/2022/04/06-10-22_DILLON_FRANCIS_1920x1080.png", date: "Friday, June 10, 2022", start_time: "21:30", venue_id: v1.id, user_id: jeni.id)
e6 = Event.create!(name: "Dada Life: Blood, Sweat & Smiles Tour", image_url: "https://timenightclub.com/wp-content/uploads/2022/03/07-02-22_Dada_Life_1920x1080.png", date: "Saturday, July 2, 2022", start_time: "21:30", venue_id: v1.id, user_id: jeni.id)
e7 = Event.create!(name: "Grown-up Rolling", image_url: "https://cdn2.orangecoast.com/wp-content/uploads/sites/7/2019/05/CIZ4399-cmyk-600x401.jpg", date: "Thursday, June 2, 2022", start_time: "20:30", venue_id: v3.id, user_id: francis.id)
e8 = Event.create!(name: "You're It", image_url: "https://cdn2.orangecoast.com/wp-content/uploads/sites/7/2019/05/DSC_0086-cmyk-600x403.jpg", date: "Wednesday, June 15, 2022", start_time: "19:00", venue_id: v4.id, user_id: francis.id)
e9 = Event.create!(name: "Silent Yoga", image_url: "https://cdn2.orangecoast.com/wp-content/uploads/sites/7/2019/05/YogaSocialDateNight_Warrior1_cmyk-600x400.jpg", date: "Thursday, June 16, 2022", start_time: "19:00", venue_id: v5.id, user_id: jeni.id)

puts "📃 Seeding comments..."
Comment.create!(event_id: e1.id, content: "Oh my gooshhh!! Can't she will be playing in OC. Can't wait!")

puts "✅ Done seeding"