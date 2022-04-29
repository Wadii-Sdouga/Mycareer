import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../service';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';

function Profil() {

	const [posts, setPosts] = useState([]);
	const [email, setEmail] = useState('');
	const [nom, setNom] = useState('');
	const [numTel, setNumTel] = useState('');


	const getData = async () => {
		try {
			const response = await api.get('http://localhost:5000/profil');
			 setPosts(response.data);
		} catch (error) {
			console.log(error);
		}
	};





	const submitReview = async (s) => {
		s.preventDefault();
		api.post('/profil', {
			email,
			nom,
			numTel
		})
			.then(() => {
				window.location.replace("/dashboard");
			})

			.catch((err) => {
				const message = err.response.data
				alert(message);
			})
	};




	// React Hook that executes the fetch function on the first render 
	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<div className=''>
			
			<div className=''>
			<SideBar />
			</div>

			<div class="d-flex align-self-start">
			<NavBar />
			</div>
			</div>
			<div className="container">
				<div className="main-body">

					<div className="row gutters-sm">
						<div className="col-md-4 mb-3 ">
							<div className="card">
								<div className="card-body">
									<div className="d-flex flex-column align-items-center text-center">
										{posts.map((post, i, index) => {
											i += 1;
											index += 1;

											if (!(i > 1))
												return (
													<div className="mt-3">
														<h4>{post.nom}</h4>
														<p className="text-secondary mb-1">{post.titre}</p>
														<p className="text-muted font-size-sm">Ariana,Tunisia</p>
														
													</div>
												)

										}
										)}
									</div>
								</div>
							</div>
							<div className="card mt-3">
								<ul className="list-group list-group-flush">
									<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
										<h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
										<span className="text-secondary" ><a href='https://www.mobelite.fr/fr/'> https://www.mobelite.fr/fr/</a></span>
									</li>

									<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
										<h6 className="mb-0"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path fill="#0077B5" fill-rule="evenodd" d="M20.45175,20.45025 L16.89225,20.45025 L16.89225,14.88075 C16.89225,13.5525 16.86975,11.844 15.04275,11.844 C13.191,11.844 12.90825,13.2915 12.90825,14.7855 L12.90825,20.45025 L9.3525,20.45025 L9.3525,8.997 L12.765,8.997 L12.765,10.563 L12.81375,10.563 C13.2885,9.66225 14.4495,8.71275 16.18125,8.71275 C19.78575,8.71275 20.45175,11.08425 20.45175,14.169 L20.45175,20.45025 Z M5.33925,7.4325 C4.1955,7.4325 3.27375,6.50775 3.27375,5.36775 C3.27375,4.2285 4.1955,3.30375 5.33925,3.30375 C6.47775,3.30375 7.4025,4.2285 7.4025,5.36775 C7.4025,6.50775 6.47775,7.4325 5.33925,7.4325 L5.33925,7.4325 Z M7.11975,20.45025 L3.5565,20.45025 L3.5565,8.997 L7.11975,8.997 L7.11975,20.45025 Z M23.00025,0 L1.0005,0 C0.44775,0 0,0.44775 0,0.99975 L0,22.9995 C0,23.55225 0.44775,24 1.0005,24 L23.00025,24 C23.55225,24 24,23.55225 24,22.9995 L24,0.99975 C24,0.44775 23.55225,0 23.00025,0 L23.00025,0 Z" />
										</svg>Linkedin</h6>
										<span className="text-secondary"><a href='https://www.linkedin.com/company/mobelite-tunisie'>Mobelite linkedin</a></span>
									</li>

									<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
										<h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
										<span className="text-secondary"><a href='https://www.facebook.com/mobelite.fr'> Mobelite Facebook</a></span>
									</li>
								</ul>
							</div>
						</div>

						{posts.map(post =>
							<div className="col-lg-8">
								<div className="card">
									<div className="card-body">
										<div className="row mb-3">
											<div className="col-sm-3">
												<h6 className="mb-0">Full Name</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												<input type="text" className="form-control" placeholder={post.nom} value={nom} onChange={(e) => {
													setNom(e.target.value);
												}
												} />
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-sm-3">
												<h6 className="mb-0">Email</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												<input type="text" className="form-control" placeholder={post.email} value={email} onChange={(e) => {
													setEmail(e.target.value);
												}
												} />
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-sm-3">
												<h6 className="mb-0">Phone</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												<input type='number' className="form-control" placeholder={post.numTel} value={numTel} onChange={(e) => {
													setNumTel(e.target.value);
												}
												} />
											</div>
										</div>

										<div className="row">
											<div className="col-sm-3"></div>
											
											<div className="col-sm-9 text-secondary">
											<a className="btn btn-info px-5 text-light " > Save Changes<input type="button" className="btn" value=""  onClick={submitReview} /></a>
											</div>
										</div>
									</div>
								</div>

							</div>
						)}

					</div>
				</div>

			</div >

		</div>
	);

}
export default Profil;