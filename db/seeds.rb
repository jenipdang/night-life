puts "📃 Seeding users..."

jeni = User.create!(username: "jenidang", email: "jenidang@gmail.com", password_digest: "1234567jd")
francis = User.create!(username: "francisdang", email: "francisdang@gmail.com", password_digest: "1234567fd")


puts "📃 Seeding venues..."
v1 = Venue.create!(name: "Time Nightclub", address: "1875 Newport Blvd B245", city: "Costa Mesa", state: "CA", zip_code: "92627")
v2 = Venue.create!(name: "OC Fair & Event Center", address:"88 Fair Dr.", city: "Costa Mesa", state: "CA", zip_code: "92626")
v3 = Venue.create!(name: "Corner Crossing", address: "9550 Bolsa Ave. Ste 115A", city: "Westminster", state: "CA", zip_code: "92683")
v4 = Venue.create!(name: "ACE Beer Club", address: "9622 Garden Grove Blvd. Ste 102", city: "Garden Grove", state: "CA", zip_code: "92844")
v5 = Venue.create!(name: "Bay Grill & Karaoke", address: "11951 Beach Blvd Ste J", city: "Stanton", state: "CA", zip_code: "90680")

puts "📃 Seeding events..."
Event.create!(name: "Kim Lee", image_url: "https://timenightclub.com/wp-content/uploads/2022/04/05-20-22_KIM_LEE_2_2160x1080_Eventbrite-1920x960.jpg", date: "Friday, May 20, 2022", start_time: "21:30", venue_id: v1.id, user_id: jeni.id)


puts "✅ Done seeding"