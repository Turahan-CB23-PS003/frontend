const Banner = () => {
  return (
    <section className="block lg:grid grid-cols-2 gap-20 mb-32">
      <div className="block lg:hidden mt-5 rounded-3xl">
        <img
          className="rounded-3xl"
          src="https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
      </div>
      <div className="mt-5 text-lg">
        <p className="mb-5">
          Pemborosan makanan memiliki dampak negatif yang signifikan terhadap
          lingkungan, ekonomi, dan masyarakat. Pembuangan makanan menghasilkan
          emisi gas rumah kaca, menyumbang ke perubahan iklim. Pemborosan
          makanan juga merupakan sumber daya yang terbuang sia-sia, yang dapat
          digunakan untuk memberi makan orang yang lapar.
        </p>
        <p className="mb-5">
          Turahan bekerja untuk mengatasi masalah pemborosan makanan dengan
          menghubungkan makanan berlebih dari restoran, hotel, dan donatur
          dengan mereka yang membutuhkan. Turahan melakukan ini dengan membangun
          komunitas yang peduli dan bersedia berbagi.
        </p>
        <p>
          Komunitas Turahan terdiri dari restoran, hotel, donatur, dan penerima
          manfaat. Restoran dan hotel menyumbangkan makanan berlebih yang tidak
          dapat mereka jual. Donatur menyumbangkan makanan yang telah dimasak
          atau makanan mentah. Penerima manfaat adalah orang-orang yang
          membutuhkan makanan, termasuk orang miskin, tunawisma, dan korban
          bencana.
        </p>
      </div>
      <div className="hidden lg:block h-full">
        <img
          style={{ borderRadius: "35px" }}
          className="h-full object-cover"
          src="https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Banner Image"
        />
      </div>
    </section>
  );
};

export default Banner;
